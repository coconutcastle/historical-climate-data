import Papa from 'papaparse';
import { monthType } from '../../common/constants';
import { CyclesData, CyclesDataStationDetails, DataTypes, MonthlyDataStationDetails, MonthlyData, StationMetadata } from '../../common/download.interface';

// only available if the user selected the option to also get the station metadata
export const insertStationMetadata = (
  contentType: DataTypes,
  content: MonthlyData[] | CyclesData[],
  stations: StationMetadata[]
): any[] => {

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

export const formatDate = (year: number, month: monthType, dateFormat: string): string => {
  return '';
}

export const downloadCSV = (content: any, fileName: string, fields?: string[]) => {
  const csvString: string = fields ? Papa.unparse({ fields: fields, data: content }) : Papa.unparse(content);
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

export const jsonToArrays = (content: any, dataType?: DataTypes) => {
  const contentArray = [];
  const csvString: string = Papa.unparse(content);
  const rows: string[] = dataType === 'cycles' ? (csvString.replaceAll('"', '')).split('\n') : csvString.split('\n');
  if (dataType === 'cycles') {
    contentArray.push(['station', 'month', 'mean', 'standard_deviation', 'percentiles'])
    for (let i = 1; i < rows.length; i++) {
      const annualRow = rows[i].split(',');
      contentArray.push([...annualRow.slice(0, 4), annualRow.slice(4).join(', ')]);    // making sure the array in the last index doesn't get split
    };
  } else {
    for (let i = 0; i < rows.length; i++) {
      contentArray.push(rows[i].split(','));
    }
  }
  return contentArray;
}