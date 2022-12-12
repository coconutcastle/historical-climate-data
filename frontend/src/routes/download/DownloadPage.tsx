import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";
import { useState } from "react";
import { useQuery } from 'react-query';
import { getAllCountries, getAllStationMetadata, getAllRegions } from '../../GHCNMService';
import { ParamsFields, RawRegions, StationMetadata } from "../../common/download.interface";
import { ReactQueryConfig, QueryKeys } from "../../common/constants";

export default function DownloadPage() {

  const [params, setParams] = useState<ParamsFields>({
    years: [],
    months: [],
    countries: [],
    regions: [],
    coordinates: [{
      latitude: { single: null, start: null, end: null },
      longitude: { single: null, start: null, end: null },
      elevation: { single: null, start: null, end: null },
    }],
    station: [],
    dataTypes: []
  });

  const { data: dataCountries, error: errorCountries, isLoading: isLoadingCountries } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    ...ReactQueryConfig,
    queryFn: () => getAllCountries()
  });

  const { data: dataStations, error: errorStations, isLoading: isLoadingStations } = useQuery({
    queryKey: [QueryKeys.STATIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllStationMetadata()
  });

  const { data: dataRegions, error: errorRegions, isLoading: isLoadingRegions } = useQuery({
    queryKey: [QueryKeys.REGIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllRegions()
  });

  return (
    <div className="data-content">
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'>
          {(isLoadingCountries || isLoadingStations || isLoadingRegions) && (
            <div className='params-section heading-1'>
              Loading...
            </div>
          )}
          {(dataCountries && dataStations && dataRegions) && (
            <>
              <ParamsSection
                params={params}
                onParamsChanged={(newParams: ParamsFields) => setParams(newParams)}
                countries={dataCountries}
                stations={dataStations.map((station: StationMetadata) => ({
                  code: station.code,
                  name: station.name
                }))}
                regions={dataRegions.map((region: RawRegions) => region.region)}
              />
              <FormatSection />
            </>
          )}
        </div>
        <SelectionSection params={params} />
      </div>
    </div>
  )
}