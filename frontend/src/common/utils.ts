import Papa from 'papaparse';
import JSZip from 'jszip';
import { monthIndex, monthType } from './constants';
import { DataTypes } from './download.interface';

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

export const downloadJSON = (jsonString: string, fileName: string) => {
  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(
    new Blob([jsonString], {
      type: 'application/json'
    })
  );
  link.download = `${fileName}.json`;
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