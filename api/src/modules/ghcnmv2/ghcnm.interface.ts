export type monthValues = Record<monthType, number | null>;

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

export type DataTypes = 'prcp' | 'anom' | 'cycles' | 'stations';

export interface Range {
  single?: number;    // axios removes null params
  start?: number;
  end?: number;
}

export interface CoordinateRange {
  latitude: Range;
  longitude: Range;
  elevation: Range;
}

export interface CountryInfo {
  code: number;
  country: string;
  supportedRegions: [];
}

export interface GHCNMBasicStationMetadata {
  station: string;
  name: string | null;
}

export interface downloadParams {
  years: Range[];
  months: monthType[];
  countries: string[];    // only country name necessary
  regions: string[];
  coordinates: CoordinateRange[];
  stations: string[];     // only station code necessary
  dataTypes: DataTypes[];
}

export interface whereConditionParams {
  years?: Range[],
  months?: monthType[],
  countries?: string[],   // use country name
  regions?: string[],
  coordinates?: CoordinateRange[],
  stations?: string[]
}