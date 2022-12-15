import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";
import { useCallback, useState } from "react";
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import { getAllCountries, getAllRegions, getAllBasicStationMetadata, getDownloadData } from '../../services/GHCNMService';
import { ParamsFields, RawRegions } from "../../common/download.interface";
import { ReactQueryConfig, QueryKeys } from "../../common/constants";

export default function DownloadPage() {
  const [downloadError, setDownloadError] = useState<string | undefined>();

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

  const { data: downloadData, error: errorDownloadData, isLoading: isLoadingDownloadData, refetch: refetchDownloadData } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD],
    ...ReactQueryConfig,
    enabled: false,
    queryFn: () => getDownloadData(false, params)
  });

  // console.log(dataCountries)
  console.log(downloadData)

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
              <FormatSection />
            </>
          )}
        </></div>
        <SelectionSection params={params} />
      </div>
      {(dataCountries && dataStations && dataRegions) && (
        <div className='d-flex flex-row justify-content-center pt-3 pb-5' style={{ width: '65%' }} >
          <div className='column'>
            <button className={`big-button ${isLoadingDownloadData === true ? 'disabled' : ''}`} style={{ width: '250px' }}
              onClick={(e) => {
                if (params.dataTypes.length === 0) {
                  setDownloadError('Please select data type');
                } else {
                  setDownloadError(undefined)
                  refetchDownloadData();
                }
              }}>
              <div className='button-text'>
                DOWNLOAD
              </div>
              {isLoadingDownloadData === true ?
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