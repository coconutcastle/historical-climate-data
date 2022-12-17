
export enum QueryKeys {
  STATIONS = 'stations',
  BASIC_STATIONS = 'basic-stations',
  COUNTRIES = 'countries',
  REGIONS = 'regions',
  DOWNLOAD = 'download'
}

export const ReactQueryConfig = {
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  retry: 3,
  staleTime: Infinity,    // nothing but GET requests so it's not like the data will become out of date...
}

export const getHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET'
}

export type monthType =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';

export enum Months {
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December'
}

export const annualCycleFields = ['station', 'month', 'mean', 'standard_deviation', '2.5', '17', '50', '83', '97.5'];