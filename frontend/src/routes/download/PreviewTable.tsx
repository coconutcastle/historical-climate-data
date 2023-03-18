import { useEffect, useState } from "react";
import { DataTypes, DataTypeText, FormatFields, ParamsFields } from "../../common/download.interface";
import { Tab, Table, Tabs } from 'react-bootstrap';
import { cyclesSample, anomMmSample, anomPercentageSample, prcpSample, stationsSample } from './samples/samples';
import { formatData, jsonToArrays } from './formatDownloadUtils';
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
  anom_pcnt: any[],
  cycles: any[],
  stations: any[]
}

const initialSamples: DataSamples = {
  prcp: jsonToArrays(prcpSample),
  anom: jsonToArrays(anomMmSample),
  anom_pcnt: jsonToArrays(anomPercentageSample),
  cycles: jsonToArrays(cyclesSample, 'cycles'),
  stations: jsonToArrays(stationsSample)
}

export const PreviewTable = ({ params, format }: PreviewTableProps) => {

  const [dataSamples, setDataSamples] = useState<DataSamples>(initialSamples);

  useEffect(() => {
    const reducedFormat: FormatFields = {...format};
    reducedFormat.files = 'concat';
    setDataSamples({
      prcp: jsonToArrays(params.dataTypes.includes('prcp') ? formatData(prcpSample, 'prcp', reducedFormat, params.months.length, stationsSample) : prcpSample),
      anom: jsonToArrays(params.dataTypes.includes('anom') ? formatData(anomMmSample, 'anom', reducedFormat, params.months.length, stationsSample) : anomMmSample),
      anom_pcnt: jsonToArrays(params.dataTypes.includes('anom_pcnt') ? formatData(anomPercentageSample, 'anom', reducedFormat, params.months.length, stationsSample) : anomPercentageSample),
      cycles: jsonToArrays(params.dataTypes.includes('cycles') ? formatData(cyclesSample, 'cycles', reducedFormat, params.months.length, stationsSample) : cyclesSample, 'cycles'),
      stations: jsonToArrays(stationsSample)
    });
  }, [params, format]);    // don't react to bystation - messes things up

  // console.log('preview data is', dataSamples)

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
                {dataSamples[type].slice(1).map((row: any[], index: number) => (
                  <tr key={index}>
                    {row.map((element: any, i: number) => <td key={`${index}-${i}`}>{type === 'cycles' && i === row.length ? JSON.parse(element) : element}</td>)}
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