
export enum QueryKeys {
  STATIONS = 'stations',
  BASIC_STATIONS = 'basic-stations',
  COUNTRIES = 'countries',
  REGIONS = 'regions',
}

export const ReactQueryConfig = {
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  staleTime: Infinity,    // nothing but GET requests so it's not like the data will become out of date...
}

export const getHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET'
}