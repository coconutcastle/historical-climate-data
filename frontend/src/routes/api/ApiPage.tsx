import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import starterText from './starterText.json';

type endpoints = 'stations' | 'basic-stations' | 'countries' | 'regions' | 'download';

const endpointsUrls: Record<endpoints, string> = {
  'stations': '/stations',
  'basic-stations': '/basic/stations',
  'countries': '/countries',
  'regions': '/regions',
  'download': '/download'
}

export default function ApiPage() {

  const [endpoint, setEndpoint] = useState<endpoints>('stations');
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'json'>('csv');
  const [queryParams, setQueryParams] = useState<string>('No parameters.');

  useEffect(() => {
    setQueryParams(starterText[endpoint]);
  }, [endpoint]);

  return (
    <div className="data-content" style={{ height: '100vh' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className='heading-1'>
        API
      </div>
      <div className="d-flex flex-row align-items-center mt-2 mb-2">
        <b className="me-2">Endpoint: </b>
        <Select
          id="endpoint-select"
          value={endpoint}
          onChange={(e: any) => (setEndpoint(e.target.value))}
          style={{ width: '15%' }}
        >
          {Object.keys(endpointsUrls).map((endpoint: string) =>
            <MenuItem value={endpoint}>{endpointsUrls[endpoint as endpoints]}</MenuItem>)}
        </Select>
      </div>
      <div className="d-flex flex-row" style={{ height: "85%" }}>
        <div className="d-flex flex-column w-100 me-1">
          <textarea id='query-params-textarea' className="text-area"
            style={{ whiteSpace: 'pre' }}
            value={queryParams}
            onChange={(e: any) => setQueryParams(e.target.value)}
          />
          {/* <button className='med-button mx-auto'>
            <div className='med-button-text'>
              DOWNLOAD
            </div>
            <i className='material-icons'>play_arrow</i>
          </button> */}
        </div>
        <div className="d-flex flex-column w-100 ms-2">
          <textarea readOnly id='response-textarea' className="text-area" style={{ whiteSpace: 'pre' }} />
          <div className="d-flex flex-row align-items-center mx-auto mt-2">
            <div className="me-2">Download as</div>
            <Select
              id="download-format-select"
              value={downloadFormat}
              onChange={(e: any) => (setDownloadFormat(e.target.value))}
              style={{ width: '80px' }}
            >
              <MenuItem value={'csv'}>CSV</MenuItem>
              <MenuItem value={'json'}>JSON</MenuItem>
            </Select>
          </div>
          {/* <button className='med-button mx-auto'>
            <div className='med-button-text'>
              DOWNLOAD
            </div>
            <i className='material-icons'>play_arrow</i>
          </button> */}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        <button className='med-button mx-auto'>
          <div className='med-button-text'>
            DOWNLOAD
          </div>
          <i className='material-icons'>play_arrow</i>
        </button>
        <button className='med-button mx-auto'>
          <div className='med-button-text'>
            DOWNLOAD
          </div>
          <i className='material-icons'>play_arrow</i>
        </button>
      </div>

    </div>
  )
}