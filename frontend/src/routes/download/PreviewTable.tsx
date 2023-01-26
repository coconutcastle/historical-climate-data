import { useEffect, useState } from "react";
import { DataTypes, DataTypeText, FormatFields, ParamsFields } from "../../common/download.interface";
import { Tab, Table, Tabs } from 'react-bootstrap';
import { cyclesSample, anomSample, prcpSample, stationsSample } from './samples/samples';
import { jsonToArrays } from './formatDownloadUtils';
import { Months, monthIndex } from "../../common/constants";
import { toTitleCase } from "../../common/helpers";


interface PreviewTableProps {
  params: ParamsFields;
  format: FormatFields;
  downloadData: any[];
}

// const samples: Record<DataTypes, any[]> = {
//   prcp: jsonToArrays(prcpSample),
//   anom: jsonToArrays(anomSample),
//   cycles: jsonToArrays(cyclesSample, 'cycles'),
//   stations: jsonToArrays(stationsSample)
// }

interface DataSamples {
  prcp: any[],
  anom: any[],
  cycles: any[],
  stations: any[]
}

const initialSamples: DataSamples = {
  prcp: jsonToArrays(prcpSample),
  anom: jsonToArrays(anomSample),
  cycles: jsonToArrays(cyclesSample, 'cycles'),
  stations: jsonToArrays(stationsSample)
}

export const PreviewTable = ({ params, format }: PreviewTableProps) => {

  const [dataSamples, setDataSamples] = useState<DataSamples>(initialSamples);

  const updatePreview = () => {     // for loops to increase efficiency
    const unincludedMonths = Object.keys(monthIndex).filter((month: string) => !(params.months.includes(toTitleCase(month) as Months)));
    for (let i = 0; i < params.dataTypes.length; i++) {
      const type = params.dataTypes[i];
      let newSample = initialSamples[type];
      let spreadSample = [];
      for (let row = 0; row < newSample.length; row++) {
        if (!(params.months.length === 0 || params.months.length === 12)) {
          if (type === 'anom' || type === 'prcp') {
            unincludedMonths.forEach((unincludedMonth: string) => delete newSample[row][unincludedMonth]);
          } else if (type === 'cycles') {
            newSample = newSample.filter((monthCycle: any) => params.months.includes(monthCycle.month));
          };
        };
        if ((type === 'anom' || type === 'prcp') && format.monthlyDataViewFormat === 'spread') {
          if (format.insertMetadata) {

          } else {
            
          }
          const { station, year, ...months } = newSample[row];
        };
        if ((type === 'anom' || type === 'prcp') && format.monthlyDataViewFormat === 'condensed') {
          if (format.insertMetadata) {

          } else {
            
          }
          const { station, year, ...months } = newSample[row];
        }
      }

    }
  }


  useEffect(() => {

  }, [params, format])

  return (
    <Tabs
      defaultActiveKey={params.dataTypes[0]}
      transition={false}
      id="noanim-tab-example"
      className="preview-tabs"
    >
      {params.dataTypes.map((type: DataTypes) =>
        <Tab eventKey={type} title={DataTypeText[type]} key={type}>
          <div className='table-wrapper' >
            <Table className='preview-table' responsive="lg">
              <thead>
                <tr>
                  {dataSamples[type][0].map((headerColumn: string) => <th key={headerColumn}>{headerColumn}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataSamples[type].slice(1).map((row: string[], index: number) => (
                  <tr key={index}>
                    {row.map((element: string, i: number) => <td key={`${index}-${i}`}>{element}</td>)}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      )}
    </Tabs>
  );
}