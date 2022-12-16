import { monthValues, monthType } from "./ghcnm.interface";

export class GHCNMStationMetadataDto {
  station: string;
  identifier: string;
  name: string | null;
  region: string | null;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number | null;
}

//used for situations where you need to get a lot of stations but don't need all the data
export class GHCNMBasicStationMetadataDto {
  station: string;
  name: string | null;
}

// full station data
export class GHCNMStationDataDto extends GHCNMStationMetadataDto {
  monthly: GHCNMMonthlyDataDto[];
  anomaly: GHCNMMonthlyDataDto[];
  annualCycles: GHCNMAnnualCycleDto[];
}

// covers both precipitation and anomaly data
export class GHCNMMonthlyDataDto {
  year: number;
  dataIdentifier: string;
  data: {
    precipitation: monthValues;
    anomaly: monthValues;
  };
}

// use this if you only want anomaly or monthly data
export class GHCNMStationMonthlyDataDto extends GHCNMMonthlyDataDto {
  station: GHCNMStationMetadataDto;
}

export class GHCNMAnnualCycleDto {
  month: monthType;
  stats: {
    mean: number | null;
    standardDeviation: number | null;
    percentiles: {
      '2.5': number | null;
      '17': number | null;
      '50': number | null;
      '83': number | null;
      '97.5': number | null;
    };
  };
}

// use this if you just want annual cycle data
export class GHCNMStationAnnualCycleDto extends GHCNMAnnualCycleDto {
  station: GHCNMStationMetadataDto;
}

export class GHCNMCountryDto {
  code: number;
  country: string;
  supportedRegions: string[]
}

