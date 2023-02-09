import { useEffect, useState } from "react";
import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import { downloadCSV, formatData } from "./formatDownloadUtils";
import { getAllCountries, getAllRegions, getAllBasicStationMetadata, getDownloadData } from '../../services/GHCNMService';
import { DataTypes, FormatFields, ParamsFields, RawRegions } from "../../common/download.interface";
import { ReactQueryConfig, QueryKeys } from "../../common/constants";

export default function DownloadPage() {
  const [downloadError, setDownloadError] = useState<string | undefined>();
  const [doDownload, setDoDownload] = useState<boolean>(false);

  const [params, setParams] = useState<ParamsFields>({
    years: [],
    months: [],
    countries: [],
    regions: [],
    coordinates: [{
      latitude: { single: null, start: null, end: null },   //set initial value for coordinates so users can see the coordinate input box
      longitude: { single: null, start: null, end: null },
      elevation: { single: null, start: null, end: null },
    }],
    stations: [],
    dataTypes: []
  });

  const [format, setFormat] = useState<FormatFields>({
    monthlyDataViewFormat: 'condensed',
    combineDates: 'separate',
    dateFormat: '',
    files: 'concat',
    insertMetadata: false,
  });

  const { data: dataCountries, error: errorCountries, isLoading: isLoadingCountries } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    ...ReactQueryConfig,
    queryFn: () => getAllCountries()
  });

  const { data: dataStations, error: errorStations, isLoading: isLoadingStations } = useQuery({
    queryKey: [QueryKeys.BASIC_STATIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllBasicStationMetadata()
  });

  const { data: dataRegions, error: errorRegions, isLoading: isLoadingRegions } = useQuery({
    queryKey: [QueryKeys.REGIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllRegions()
  });

  // currently it seems like you can't download more than once...
  const { data: downloadData, error: errorDownloadData, isLoading: isLoadingDownloadData, refetch: refetchDownloadData } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD],
    ...ReactQueryConfig,
    enabled: doDownload,
    queryFn: () => getDownloadData(false, params)
  });

  useEffect(() => {
    if (doDownload && errorDownloadData) {
      setDownloadError('Download failed');
      setDoDownload(false);
    }
    if (doDownload && downloadData) {
      console.log(params, format);
      Object.keys(downloadData).forEach((downloadType: string) => {
        if (downloadData[downloadType].length > 0) {
          const formattedDownload: any[] = formatData(downloadData[downloadType], downloadType as DataTypes, format, params.months.length, downloadData['stations']);
          // if (format.files === 'byStation') {
          //   for (let i = 0; i < formattedDownload.length; i++) {
          //     downloadCSV(formattedDownload[i], formattedDownload[i]['station']);
          //   };
          // } else {
          //   downloadCSV(formattedDownload, downloadType);
          // }
          console.log('formatted download is', formattedDownload)
        }

        // if (downloadData[downloadType].length > 0) {
        //   // downloadCSV(downloadData[downloadType], downloadType);
        //   console.log(downloadData[downloadType])
        // }
      });
      setDoDownload(false);
    }
  }, [format, downloadData, errorDownloadData, doDownload]);

  // console.log(downloadData)

  return (
    <div className="data-content"
      style={{ height: !(dataCountries && dataStations && dataRegions) ? '100vh' : '100%' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'><>
          {(errorCountries || errorStations || errorRegions) && (
            <div className='params-section heading-1'>
              There was an error loading the data.
            </div>
          )}
          {(isLoadingCountries || isLoadingStations || isLoadingRegions) && (
            <div className='params-section heading-1'>
              <Spinner animation="border" className='me-4' /> Loading...
            </div>
          )}
          {(dataCountries && dataStations && dataRegions) && (
            <>
              <ParamsSection
                params={params}
                onParamsChanged={(newParams: ParamsFields) => setParams(newParams)}
                countries={dataCountries}
                stations={dataStations}
                regions={dataRegions.map((region: RawRegions) => region.region)}
              />
              <FormatSection
                format={format}
                onFormatChanged={(newFormat: FormatFields) => setFormat(newFormat)}
                params={params} />
            </>
          )}
        </></div>
        <SelectionSection params={params} format={format} />
      </div>
      {(dataCountries && dataStations && dataRegions) && (
        <div className='d-flex flex-row justify-content-center pt-3 pb-5' style={{ width: '65%' }} >
          <div className='column'>
            <button className={`big-button ${isLoadingDownloadData === true ? 'disabled' : ''}`} style={{ width: '250px' }}
              onClick={(e) => {
                if (params.dataTypes.length === 0) {
                  setDownloadError('Please select data type');
                } else {
                  setDownloadError(undefined);
                  setDoDownload(true);
                  refetchDownloadData();
                }
              }}>
              <div className='button-text'>
                DOWNLOAD
              </div>
              {doDownload === true ?
                <Spinner animation="border" className="heading-1 text-white" /> : <i className='material-icons'>download_outlined</i>
              }
            </button>
            {downloadError && (
              <div className="text-field-error pt-1 text-center">{downloadError}</div>
            )}
          </div>
          <button className='big-button ms-3 disabled' style={{ width: '250px' }}>
            <div className='button-text'>
              VISUALIZE
            </div>
            <i className='material-icons'>play_arrow</i>
          </button>
        </div>
      )}
    </div>
  )
}