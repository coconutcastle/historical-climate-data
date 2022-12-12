import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'stationmetadata' })
export class GHCNMStationMetadata {
  @Column('character varying', { nullable: false })
  station: string;

  @PrimaryColumn('bigint', { nullable: false, width: 11 })
  identifier: string;

  @Column('character varying', { nullable: true })
  name: string | null;

  @Column('character varying', { nullable: true })
  region: string | null;

  @Column('character varying', { nullable: false })
  country: string;

  @Column('numeric', { nullable: false })
  latitude: number;

  @Column('numeric', { nullable: false })
  longitude: number;

  @Column('numeric', { nullable: true })
  elevation: number | null;
}

@Entity({ schema: 'anomalies' })
export class GHCNMAnomalyData {
  @PrimaryColumn('character varying', { nullable: false })
  station: string;

  @PrimaryColumn('integer', { nullable: false, width: 4 })
  year: number;

  @Column('numeric', { nullable: true })
  january: number | null;

  @Column('numeric', { nullable: true })
  february: number | null;

  @Column('numeric', { nullable: true })
  march: number | null;

  @Column('numeric', { nullable: true })
  april: number | null;

  @Column('numeric', { nullable: true })
  may: number | null;

  @Column('numeric', { nullable: true })
  june: number | null;

  @Column('numeric', { nullable: true })
  july: number | null;

  @Column('numeric', { nullable: true })
  august: number | null;

  @Column('numeric', { nullable: true })
  september: number | null;

  @Column('numeric', { nullable: true })
  october: number | null;

  @Column('numeric', { nullable: true })
  november: number | null;

  @Column('numeric', { nullable: true })
  december: number | null;
}

@Entity({ schema: 'prcp' })
export class GHCNMPrecipitationData extends GHCNMAnomalyData {
  @Column('bigint', { nullable: false, width: 16 })
  identifier: string;
}

@Entity({ schema: 'annualcycles' })
export class GHCNMAnnualCycleData {
  @PrimaryColumn('character varying', { nullable: false })
  station: string;

  @PrimaryColumn('character varying', { nullable: false })
  month: string;

  @Column('numeric', { nullable: true })
  mean: number | null;

  @Column('numeric', { nullable: true })
  standard_deviation: number | null;

  @Column('numeric', { nullable: true })
  2.5: number | null;

  @Column('numeric', { nullable: true })
  17: number | null;

  @Column('numeric', { nullable: true })
  50: number | null;

  @Column('numeric', { nullable: true })
  83: number | null;

  @Column('numeric', { nullable: true })
  9.5: number | null;
}

@Entity({ schema: 'public', name: 'countrycodes' })
export class GHCNMCountryCode {
  @PrimaryColumn('integer', { nullable: false, width: 3 })
  code: number;

  @Column('numeric', { nullable: false })
  country: string;
}