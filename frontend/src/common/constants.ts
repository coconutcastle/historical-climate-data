
export enum QueryKeys {
  STATIONS = 'stations',
  COUNTRIES = 'countries',
  REGIONS = 'regions',
}

export const ReactQueryConfig = {
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  staleTime: Infinity,    // nothing but GET requests so it's not like the data will become out of date...
}