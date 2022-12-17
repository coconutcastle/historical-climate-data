import React from 'react';
import { DataTypes, DataTypeText } from "../../common/download.interface";
import { Tab, Table, Tabs } from 'react-bootstrap';
import { cyclesSample, anomSample, prcpSample, stationsSample } from './samples/samples';
import { jsonToArrays } from './formatDownloadUtils';


interface PreviewTableProps {
  dataTypes: DataTypes[];
  downloadData: any[];
}

const samples: Record<DataTypes, any[]> = {
  prcp: jsonToArrays(prcpSample),
  anom: jsonToArrays(anomSample),
  cycles: jsonToArrays(cyclesSample, 'cycles'),
  stations: jsonToArrays(stationsSample)
}

export const PreviewTable = ({ dataTypes }: PreviewTableProps) => {
  return (
    <Tabs
      defaultActiveKey={dataTypes[0]}
      transition={false}
      id="noanim-tab-example"
      className="preview-tabs"
    >
      {dataTypes.map((type: DataTypes) =>
        <Tab eventKey={type} title={DataTypeText[type]} key={type}>
          <div className='table-wrapper' >
          <Table className='preview-table' responsive="lg">
            <thead>
              <tr>
                {samples[type][0].map((headerColumn: string) => <th key={headerColumn}>{headerColumn}</th>)}
              </tr>
            </thead>
            <tbody>
              {samples[type].slice(1).map((row: string[], index: number) => (
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