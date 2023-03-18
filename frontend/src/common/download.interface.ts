import { monthType, Months } from "./constants";

export interface Range {
  single: number | null;    //either this or start + end will be null
  start: number | null;
  end: number | null;
}

export interface CoordinateRange {
  latitude: Range;
  longitude: Range;
  elevation: Range;
}

export const DataTypeText: Record<string, string> = {
  'prcp': 'Monthly Precipitation',
  'anom': 'Monthly Anomalies (mm)',
  'anom_pcnt': 'Monthly Anomalies (percentages)',
  'cycles': 'Statistics per Month',
  'stations': 'Station Metadata'
}

export type DataTypes = 'prcp' | 'anom' | 'anom_pcnt' | 'cycles' | 'stations';

export interface ParamsFields {
  years: Range[];
  months: Months[];
  countries: CountryInfo[];
  regions: string[];
  coordinates: CoordinateRange[];
  stations: StationMetadataBasic[];
  dataTypes: DataTypes[];
}

export interface FormatFields {
  monthlyDataViewFormat: 'condensed' | 'spread';
  combineDates: 'separate' | 'combine';     // only applicable in spread view
  dateFormat: string;
  files: 'byStation' | 'concat';
  insertMetadata: boolean;
}

export interface CountryInfo {
  code: number;
  country: string;
  supportedRegions: [];
}

// get the data raw from the backend, process it in the frontend to avoid unecessary additional processing

export interface StationMetadata {
  station: string;
  name: string | null;
  region: string | null;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number | null;
}

export interface StationMetadataBasic {
  station: string;
  name: string | null;
}

export interface MonthlyData {
  station: string;
  year: number;
  january?: number | null;
  february?: number | null;
  march?: number | null;
  april?: number | null;
  may?: number | null;
  june?: number | null;
  july?: number | null;
  august?: number | null;
  september?: number | null;
  october?: number | null;
  november?: number | null;
  december?: number | null;
}

export interface CyclesData {
  station: string;
  month: monthType;
  mean: number | null;
  standardDeviation: number | null;
  percentiles: number[]
}

export type percentile = '2.5' | '17' | '50' | '83' | '97.5';

export interface RawRegions {
  region: string;
}

// format of data that has had station metadata stuffed into them

export interface MonthlyDataStationDetails extends MonthlyData {
  name: string | null;
  country: string;
  region: string | null;
  latitude: number;
  longitude: number;
  elevation: number | null;
}

export interface CyclesDataStationDetails extends CyclesData {
  name: string | null;
  country: string;
  region: string | null;
  latitude: number;
  longitude: number;
  elevation: number | null;
}
