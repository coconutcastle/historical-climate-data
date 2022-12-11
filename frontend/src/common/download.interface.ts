
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
  countries: string[];
  regions: string[];
  latitude: Range[];
  longitude: Range[];
  elevation: Range[];
  station: string[];
  dataTypes: DataTypes[];
}