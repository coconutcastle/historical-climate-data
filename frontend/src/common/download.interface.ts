
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

export interface Range {
  single: number | null;    //either this or start + end will be null
  start: number | null;
  end: number | null;
}

export type DataTypes = 'prcp' | 'anom' | 'cycles';

export interface ParamsFields {
  years: Range[];
  months: Months[];
  countries: CountryInfo[];
  regions: string[];
  latitude: Range[];
  longitude: Range[];
  elevation: Range[];
  station: StationMetadataBasic[];
  dataTypes: DataTypes[];
}

export interface CountryInfo {
  code: number;
  country: string;
  supportedRegions: [];
}

export interface StationMetadata {
  code: string;
  identifier: string;
  name: string | null;
  region: string | null;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number | null;
}

export interface StationMetadataBasic {
  code: string;
  name: string | null;
}

export interface RawRegions {
  region: string;
}