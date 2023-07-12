import { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import { getAllCountries, getAllRegions, getAllStationMetadata, getAllBasicStationMetadata, getDownloadData } from '../../services/GHCNMService';
import { ReactQueryConfig } from "../../common/constants";
import { downloadCSV, downloadJSON } from "../../common/utils";
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
  const [fetchResponse, setFetchResponse] = useState<string>('');
  const [doFetch, setDoFetch] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | undefined>();
  const [downloadError, setDownloadError] = useState<string | undefined>();

  const getQueryFunction = () => {
    switch (endpoint) {
      case 'stations':
        return getAllStationMetadata;
      case 'basic-stations':
        return getAllBasicStationMetadata;
      case 'countries':
        return getAllCountries;
      case 'regions':
        return getAllRegions;
      case 'download':
        return getDownloadData;
    };
  };

  const { data: resData, error: errorRes, refetch: refetchRes, isFetching: isFetchingRes } = useQuery({
    queryKey: [endpoint],
    ...ReactQueryConfig,
    enabled: doFetch,
    queryFn: () => (getQueryFunction())(endpoint === 'download' ? JSON.parse(queryParams.replace(/\s/g, "")) : undefined)
  });

  useEffect(() => {
    setQueryParams(starterText[endpoint]);
  }, [endpoint]);

  useEffect(() => {
    if (doFetch && errorRes && (!isFetchingRes)) {
      setFetchError('Data fetch failed');
      setDoFetch(false);
    };
    if (doFetch && resData && (!isFetchingRes)) {
      setFetchResponse(JSON.stringify(resData, null, "\t"));
      setDoFetch(false);
    }
  }, [doFetch, errorRes, isFetchingRes, resData]);

  return (
    <div className="data-content" style={{ minHeight: '100vh' }} >
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
            <MenuItem value={endpoint} key={endpoint}>{endpointsUrls[endpoint as endpoints]}</MenuItem>)}
        </Select>
      </div>
      <div className="d-flex flex-row" style={{ height: '70vh' }}>
        <div className="d-flex flex-column col-6 me-1">
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <button className="textarea-button"
              onClick={(e: any) => {
                setQueryParams(starterText[endpoint]);

                e.target.style.outline = '2px solid rgba(102, 205, 170, 1)';
                setTimeout(() => {
                  e.target.style.outline = '2px solid rgba(102, 205, 170, 0)';
                }, 1800);
              }}
            >RESET</button>
            <textarea id='query-params-textarea' className="text-area w-100"
              style={{ whiteSpace: 'pre' }}
              value={queryParams}
              onChange={(e: any) => setQueryParams(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex flex-column col-6 ms-2">
          <div style={{ position: 'relative', height: '100%' }}>
            <button className="textarea-button"
              onClick={(e: any) => {
                navigator.clipboard.writeText(fetchResponse);

                e.target.style.outline = '2px solid rgba(102, 205, 170, 1)';
                setTimeout(() => {
                  e.target.style.outline = '2px solid rgba(102, 205, 170, 0)';
                }, 1800);
              }}
            >COPY</button>
            <textarea id='response-textarea' className="text-area" style={{ whiteSpace: 'pre' }} value={fetchResponse} onChange={() => { }} />
          </div>
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
        </div>
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="column w-100">
          <button className='med-button mx-auto'
            onClick={(e) => {
              try {
                if (endpoint === 'download') {
                  JSON.parse(queryParams.replace(/\s/g, ""));
                }
                setFetchError(undefined);
                setDoFetch(true);
                refetchRes();
              } catch (error: any) {
                setFetchError(`Parameters cannot be parsed. ${error.name}: ${error.message}`);
              }
            }}>
            <div className='med-button-text'>
              FETCH DATA
            </div>
            {doFetch === true ?
              <Spinner animation="border" className="heading-1 text-white" style={{ height: '20px', width: '20px', fontSize: '20px' }} />
              : <i className='material-icons ms-2'>play_arrow</i>
            }
          </button>
          {fetchError && (
            <div className="text-field-error pt-1 text-center">{fetchError}</div>
          )}
        </div>
        <div className="column w-100">
          <button className='med-button mx-auto'
            onClick={() => {
              try {
                if (downloadFormat === 'json') {
                  downloadJSON(fetchResponse, endpoint);
                } else {
                  downloadCSV(resData, endpoint);
                }
              } catch (error: any) {
                setDownloadError('Download failed')
              }
            }}>
            <div className='med-button-text'>
              DOWNLOAD
            </div>
            <i className='material-icons ms-2'>download_outlined</i>
          </button>
          {downloadError && (
            <div className="text-field-error pt-1 text-center">{downloadError}</div>
          )}
        </div>
      </div>
    </div>
  )
}