
export enum QueryKeys {
  STATIONS = 'stations',
  COUNTRIES = 'countries',
  REGIONS = 'regions',
}

export const ReactQueryConfig = {
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  staleTime: Infinity,
}