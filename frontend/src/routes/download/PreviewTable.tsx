import { useEffect, useState } from "react";
import { DataTypes, DataTypeText, ParamsFields, StationMetadata } from "../../common/download.interface";
import { Tab, Table, Tabs } from 'react-bootstrap';
import { cyclesSample, anomMmSample, anomPercentageSample, prcpSample, stationsSample } from './samples/samples';
import { jsonToArrays } from './formatDownloadUtils';


interface PreviewTableProps {
  params: ParamsFields;
  formatData: (data: any[], type: DataTypes, stationMetadata?: StationMetadata[]) => any[];
}

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

export const PreviewTable = ({ params, formatData }: PreviewTableProps) => {

  const [dataSamples, setDataSamples] = useState<DataSamples>(initialSamples);

  useEffect(() => {
    setDataSamples({
      prcp: jsonToArrays(params.dataTypes.includes('prcp') ? formatData(prcpSample, 'prcp', stationsSample) : prcpSample),
      anom: jsonToArrays(params.dataTypes.includes('anom') ? formatData(anomMmSample, 'anom', stationsSample) : anomMmSample),
      anom_pcnt: jsonToArrays(params.dataTypes.includes('anom_pcnt') ? formatData(anomPercentageSample, 'anom_pcnt', stationsSample) : anomPercentageSample),
      cycles: jsonToArrays(params.dataTypes.includes('cycles') ? formatData(cyclesSample, 'cycles', stationsSample) : cyclesSample, 'cycles'),
      stations: jsonToArrays(stationsSample)
    });
  }, [params]);    // don't react to bystation - messes things up

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
                    {row.map((element: any, i: number) => <td key={`${index}-${i}`}>{element}</td>)}
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