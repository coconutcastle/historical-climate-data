import Papa from 'papaparse';
import JSZip from 'jszip';
import { monthIndex, monthType } from '../../common/constants';
import { DataTypes, StationMetadata, FormatFields } from '../../common/download.interface';

// Date is showing up weird right now but otherwise working
// only called when data is to be downloaded to reduce processing
// data is entered in arrays of JSON objects (key: column heading, value: value)
// if byStation is selected, returns an array of arrays of JSON objects - otherwise returns a single array of JSON objects
export const formatData = (data: any[], type: DataTypes, format: FormatFields, numMonths: number, stationMetadata?: StationMetadata[]): any[] => {
  if (type === 'stations') {    // no modificcations made to station metadata
    return data;
  };

  const formattedData = [];
  var formattedStation: any = {};
  var currStationCode: string = '';
  const stationBreaks: number[] = [];    // keep track of whenever we move on to a new station

  for (let row = 0; row < data.length; row++) {

    if (currStationCode !== data[row]['station']) {
      currStationCode = data[row]['station'];
      // the station metadata is only updated if the station is different to reduce computation
      formattedStation = format.insertMetadata && stationMetadata ? stationMetadata.find((stationData: StationMetadata) => currStationCode === stationData.station) : { station: currStationCode };
      stationBreaks.push(row);
    };

    // inserting station metadata is the same for all data types (excl. stations)

    if (type === 'prcp' || type === 'anom' || type === 'anom_pcnt') {
      const { station, year, ...monthlyData } = data[row];
      const monthDates = format.combineDates === 'combine' && format.dateFormat.length > 0 ? Object.keys(monthlyData).map((month: string) => formatDate(year, month as monthType, format.dateFormat)) : [];

      // make sure spread format still works when no date format set
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

      // eslint-disable-next-line no-unused-vars
      const { station, month, mean, standard_deviation, percentiles } = data[row];
      formattedData.push({
        ...formattedStation,
        month,
        mean,
        "stddev": standard_deviation,
        "prcntl_2.5": percentiles["2.5"],
        "prcntl_17": percentiles["17"],
        "prcntl_50": percentiles["50"],
        "prcntl_83": percentiles["83"],
        "prcntl_97.5": percentiles["97.5"]
      });
    };
  };

  // separating stations is the same for all data types (excl. stations)
  // data for all stations is concatenated together by default
  if (format.files === 'byStation') {
    const dataByStation: any[] = [];

    // multiply up the station breaks to account for the spread format, but only for monthly data
    const updatedStationBreaks: number[] = ((format.monthlyDataViewFormat === 'spread') && (type !== 'cycles')) ?
      stationBreaks.reduce((accumulator, current: number) => accumulator.concat(current * numMonths), [] as number[]) : stationBreaks;

    for (let s = 0; s < updatedStationBreaks.length - 1; s++) {
      dataByStation.push(formattedData.slice(updatedStationBreaks[s], updatedStationBreaks[s + 1]));
    };
    dataByStation.push(formattedData.slice(updatedStationBreaks[updatedStationBreaks.length - 1], formattedData.length - 1));    // pushing last unaccounted for elements
    return dataByStation;
  } else {
    return formattedData;
  };
}

export const formatDate = (year: number, month: monthType, dateFormat: string): string => {
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

// takes an array of the files to download
// contentArray and list of filenames should be the same length
export const downloadZip = (contentArray: any[], zipFilename: string, individualFilenames: string[]) => {
  const zip = new JSZip();
  for (let i = 0; i < contentArray.length; i++) {
    zip.file(individualFilenames[i] + '.csv', Papa.unparse(contentArray[i]));
  };
  zip.generateAsync({ type: "blob" })
    .then(function (blob) {     // probably blob type application/zip
      const link = window.document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${zipFilename}.zip`;
      link.click();
      link.remove();
    });
}

export const jsonToArrays = (content: any, dataType?: DataTypes) => {
  const contentArray = [];
  const csvString: string = Papa.unparse(content);
  const rows: string[] = dataType === 'cycles' ? (csvString.replaceAll('"', '')).split('\n') : csvString.split('\n');
  // if (dataType === 'cycles') {
  //   contentArray.push(['station', 'month', 'mean', 'standard_deviation', 'percentiles'])
  //   for (let i = 1; i < rows.length; i++) {
  //     const annualRow = rows[i].split(',');
  //     contentArray.push([...annualRow.slice(0, 4), annualRow.slice(4).join(', ')]);    // making sure the array in the last index doesn't get split
  //   };
  // } else {
  for (let i = 0; i < rows.length; i++) {
    contentArray.push(rows[i].split(','));
  }
  // }
  return contentArray;
}