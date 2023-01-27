import Papa from 'papaparse';
import { monthIndex, monthType } from '../../common/constants';
import { CyclesData, CyclesDataStationDetails, DataTypes, MonthlyDataStationDetails, MonthlyData, StationMetadata, ParamsFields, FormatFields } from '../../common/download.interface';

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

// Date is showing up weird right now but otherwise working
// only called when data is to be downloaded to reduce processing
// data is entered in arrays of JSON objects (key: column heading, value: value)
// if byStation is selected, returns an array of arrays of JSON objects - otherwise returns a single array of JSON objects
export const formatData = (data: any[], type: DataTypes, format: FormatFields, stationMetadata?: StationMetadata[]): any[] => {
  if (type === 'stations') {    // no modificcations made to station metadata
    return data;
  };

  const formattedData = [];
  var currStationMetadata: any = {};
  var currStationCode: string = '';
  const stationBreaks: number[] = [0];    // keep track of whenever we move on to a new station

  for (let row = 0; row < data.length; row++) {
    // const currStation = data[row]['station'];

    if (currStationCode !== data[row]['station']) {
      currStationCode = data[row]['station'];
      stationBreaks.push(row);    
    };
    
    // inserting station metadata is the same for all data types (excl. stations)

    const formattedStation = format.insertMetadata && stationMetadata && currStationMetadata !== currStationCode ?
      currStationMetadata = stationMetadata.find((stationData: StationMetadata) => currStationCode === stationData.station) : { station: currStationCode };

    if (type === 'prcp' || type === 'anom') {
      const { station, year, ...monthlyData } = data[row];
      const monthDates = format.combineDates === 'combine' && format.dateFormat.length > 0 ? Object.keys(monthlyData).map((month: string) => formatDate(year, month as monthType, format.dateFormat)) : [];

      if (format.monthlyDataViewFormat === 'spread') {   // condensed form is default
        if (monthDates.length > 0) {  // if dates are formatted
          for (let m = 0; m < monthDates.length; m++) {
            formattedData.push({
              ...formattedStation,
              date: monthDates[m],
              reading: Object.values(monthlyData)[m]
            });
          };
        } else {  // if dates aren't formatted
          for (let m = 0; m < Object.keys(monthlyData).length; m++) {
            formattedData.push({
              ...formattedStation,
              year,
              month: Object.keys(monthlyData)[m],
              reading: Object.values(monthlyData)[m]
            });
          };
        };
      } else {
        formattedData.push({
          ...formattedStation,
          year,
          ...monthlyData
        });
      };
    } else {    // for cycles data
      // combining dates not applicable for cycles data, as there is no year field
      // cycles data must be in spread format, so only insert metadata to be concerned about
      const { station, ...monthAndReadings } = data[row];
      formattedData.push({
        ...formattedStation,
        ...monthAndReadings
      });
    };
  };

  // separating stations is the same for all data types (excl. stations)
  // data for all stations is concatenated together by default
  if (format.files === 'byStation') {
    const dataByStation: any[] = [];
    for (let s = 0; s < stationBreaks.length - 1; s++) {
      dataByStation.push(data.slice(s, s+1));
    };
    dataByStation.push(data.slice(stationBreaks.length - 1, data.length - 1));    // pushing last unaccounted for elements
    return dataByStation;
  } else {
    return formattedData;
  };
}

export const formatDate = (year: number, month: monthType, dateFormat: string): string => {
  // const date = new Date(year, monthIndex[month], 1);
  // const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  //   year: 'numeric',    // ignore hour-minutes-seconds for now, probably not necessary
  //   month: 'numeric',
  //   day: 'numeric'
  // });

  // const dateParts = dateTimeFormatter.formatToParts(date);

  const yearIndexStart = (dateFormat.toLowerCase()).search('yyyy');
  const monthIndexStart = (dateFormat.toLowerCase()).search('mm');
  const dayIndexStart = (dateFormat.toLowerCase()).search('dd');

  const formattedDateArray = dateFormat.split('');   //string as array to make replacement easier
  if (yearIndexStart !== -1) {
    formattedDateArray.splice(yearIndexStart, 4, ...[...String(year)]);
  };
  if (monthIndexStart !== -1) {
    const monthStr = String(monthIndex[month]);
    formattedDateArray.splice(monthIndexStart, 2, monthStr.length === 1 ? '0' + monthStr : monthStr);
  };
  if (dayIndexStart !== -1) {
    formattedDateArray.splice(monthIndexStart !== -1 ? dayIndexStart - 1 : dayIndexStart, 2, '01');   // account for array element removed by mm
  };

  return formattedDateArray.join('');
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