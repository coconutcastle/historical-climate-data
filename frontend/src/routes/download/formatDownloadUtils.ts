import Papa from 'papaparse';

export const downloadCSV = (content: any, fileName: string) => {
  // const { jsonToCSV } = usePapaParse();
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