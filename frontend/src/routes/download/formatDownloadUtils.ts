import Papa from 'papaparse';
import { CyclesData, CyclesDataStationDetails, DataTypes, MonthlyDataStationDetails, MonthlyData, StationMetadata } from '../../common/download.interface';

// only available if the user selected the option to also get the station metadata
export const insertStationMetadata = (
  contentType: DataTypes,
  content: MonthlyData[] | CyclesData[],
  stations: StationMetadata[]
): MonthlyDataStationDetails[] | CyclesDataStationDetails[] => {

  // leverage the fact that the stations are in the same order in both the content and the metadata objects
  var currStation = '';
  var stationIndex = 0;
  var stationDetails = {};

  const detailedContent = [];
  
  for (let row = 0; row < content.length; row++) {
    if (currStation !== content[row].station) {
      currStation = content[row].station;
      stationIndex++;
      const { station, ...details } = stations[stationIndex];
      stationDetails = details;
    };
    
    detailedContent.push({
      ...content[row],
      ...stationDetails
    });
  };

  return detailedContent;
}

export const downloadCSV = (content: any, fileName: string) => {
  const csvString: string = Papa.unparse(content);
  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(
    new Blob([csvString], {
      type: 'text/csv'
    })
  );
  link.download = `${fileName}.csv`;
  link.click();
  link.remove();
}