import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../App';
import { csvToArrays, jsonToArrays } from '../../common/utils';
import { DisplayTable } from './DisplayTable';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const delimeters: Record<string, string> = {
  'Comma': ',',
  'Tab': '\t',
  'Space': ' '
}

export default function DisplayData() {

  const { data, dataFormat } = useContext(DataContext);
  const [delimeter, setDelimeter] = useState<string>('Comma');  // can only be keys of delimeter object
  const [displayError, setDisplayError] = useState<string | undefined>();

  // this function is here because I do not want to write it three times (useeffect and initial renders)
  const updateDisplayData = () => {
    switch(dataFormat) {
      case 'csv':
        return csvToArrays(data, delimeters[delimeter]);
      case 'json':
        return jsonToArrays(data);
      case 'txt':
        return csvToArrays(data, delimeters[delimeter]);
      case 'site':
        return {
          'prcp': jsonToArrays(data['prcp']),
          'anom': jsonToArrays(data['anom']),
          'anom_pcnt': jsonToArrays(data['anom_pcnt']),
          'cycles': jsonToArrays(data['cycles'], 'cycles'),
          'stations': jsonToArrays(data['stations']),
        };
      case 'none':
        return undefined;
      default:
        return undefined;
    }
  };

  const [displayData, setDisplayData] = useState<any>(updateDisplayData());

  useEffect(() => {
    if (dataFormat === 'none') {
      setDisplayError('No data selected. Please either upload a file or select a data subset from the Download page.')
    };
    setDisplayData(updateDisplayData());
  }, [data, dataFormat]);

  return (
    <div className="params-section h-25">
      <div className='heading-1 mb-2'>
        Confirm that this is the desired data
      </div>
      {displayError && (
        <div className="text-field-error pt-1">{displayError}</div>
      )}
      <DisplayTable displayData={displayData} />
      <div className='d-flex flex-row align-items-center mt-3'>
        <div className="me-2">Delimeter:</div>
        <Select
          id="endpoint-select"
          defaultValue={delimeter}
          value={delimeter}
          onChange={(e: any) => (setDelimeter(e.target.value))}
          style={{ width: '12%' }}
        >
          {Object.keys(delimeters).map((delim: string) =>
            <MenuItem value={delim} key={delim}>{delim}</MenuItem>)}
        </Select>
      </div>
    </div>
  )
}