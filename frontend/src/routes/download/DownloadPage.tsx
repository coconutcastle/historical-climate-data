import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";
import { useState } from "react";
import { useQuery } from 'react-query';
import { getAllCountries, getAllStationMetadata } from '../../GHCNMService';
import { ParamsFields, StationMetadata } from "../../common/download.interface";

export default function DownloadPage() {

  const [params, setParams] = useState<ParamsFields>({
    years: [],
    months: [],
    countries: [],
    regions: [],
    latitude: [],
    longitude: [],
    elevation: [],
    station: [],
    dataTypes: []
  });

  const { data: dataCountries, error: errorCountries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    queryFn: () => getAllCountries()
  });

  const { data: dataStations, error: errorStations, isLoading: isLoadingStations } = useQuery({
    queryKey: ['stations'],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    queryFn: () => getAllStationMetadata()
  });

  return (
    <div className="data-content">
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'>
          {(isLoadingCountries || isLoadingStations) && (
            <div className='params-section heading-1'>
              Loading...
            </div>
          )}
          {(dataCountries && dataStations) && (
            <>
              <ParamsSection
                params={params}
                onParamsChanged={(newParams: ParamsFields) => setParams(newParams)}
                countries={dataCountries}
                stations={dataStations.map((station: StationMetadata) => ({
                  code: station.code,
                  name: station.name
                }))}
              />
              <FormatSection />
            </>
          )}
        </div>
        <SelectionSection />
      </div>
    </div>
  )
}