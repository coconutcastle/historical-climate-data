import { DataTypes, DataTypeText } from "../../common/download.interface";
import { Tab, Tabs } from 'react-bootstrap';

interface PreviewTableProps {
  dataTypes: DataTypes[];
  downloadData: any[];
}

export const PreviewTable = ({ dataTypes, downloadData }: PreviewTableProps) => {
  return (
    <Tabs
      defaultActiveKey={dataTypes[0] ?? 'prcp'}
      transition={false}
      id="noanim-tab-example"
      className="preview-table"
    >
      <Tab eventKey="prcp" title={DataTypeText['prcp']}>
      prcp
      </Tab>
      <Tab eventKey="anom" title={DataTypeText['anom']}>
      anom
      </Tab>
      <Tab eventKey="cycles" title={DataTypeText['cycles']}>
      cycles
      </Tab>
      <Tab eventKey="stations" title={DataTypeText['stations']}>
      stations
      </Tab>
    </Tabs>
  );
}