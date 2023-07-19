import { useContext } from 'react';
import { DataContext } from '../../App';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { DataTypes, DataTypeText, ParamsFields, StationMetadata } from "../../common/download.interface";


interface DisplayTableProps {
  displayData: any;   // the array parsed data as opposed to string
}

const defaultTabs: Record<string, string> = {    // for non-site data formats
  'text': 'Plain Text',
  'parsed': 'Parsed Table'
}

export const DisplayTable = ({ displayData }: DisplayTableProps) => {
  const { data, dataFormat } = useContext(DataContext);

  return (
    <Tabs
      defaultActiveKey={dataFormat === 'site' ? Object.keys(displayData)[0] : 'parsed'}
      transition={false}
      className="preview-tabs"
    >
      {Object.keys(dataFormat === 'site' ? displayData : defaultTabs).map((tab: string) =>
        <Tab eventKey={tab} key={tab} title={dataFormat === 'site' ? DataTypeText[tab] : defaultTabs[tab]}>
          <div className='table-wrapper'>
            {(tab === 'text') ?
              <textarea className="text-area-tabbed w-100" style={{ whiteSpace: 'pre' }} value={data} onChange={() => { }} />
              :
              <Table className='preview-table' responsive="lg">
                <thead>
                  <tr>
                    { dataFormat === 'site' ?
                    (displayData[tab][0].map((heading: string) => <th key={heading}>{heading}</th>)) :
                    (displayData[0].map((heading: string) => <th key={heading}>{heading}</th>)) }
                  </tr>
                </thead>
                <tbody>
                { dataFormat === 'site' ?
                (displayData[tab].slice(1).map((row: any[], index: number) => 
                  <tr key={index}>
                    {row.map((element: any, i: number) => <td key={`${index}-${i}`}>{element}</td>)}
                  </tr>
                )) : (
                  displayData.slice(1).map((row: any[], index: number) =>
                  <tr key={index}>
                    {row.map((element: any, i: number) => <td key={`${index}-${i}`}>{element}</td>)}
                  </tr>)
                )}
                </tbody>
              </Table>
            }
          </div>
        </Tab>
      )}
    </Tabs>
  )
}