import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { buildWhereConditions } from '../../common/helpers'
import { Repository } from 'typeorm'
import { GHCNMCountryDto, GHCNMStationMetadataDto, GHCNMBasicStationMetadataDto, GHCNMStationDataDto } from './ghcnm.dto'
import { GHCNMAnnualCycleData, GHCNMAnomalyData, GHCNMCountryCode, GHCNMPrecipitationData, GHCNMStationMetadata } from './ghcnm.entity'
import { CoordinateRange, downloadParams, monthType, Range } from './ghcnm.interface'
import { ALL_MONTHS } from '../../common/constants';

@Injectable()
export class GHCNMService {
  constructor(
    // for the purposes of this project, only GET requests are necessary - will be making no modifications atm
    @InjectRepository(GHCNMStationMetadata)
    private readonly stationMetadataRepository: Repository<GHCNMStationMetadata>,
    @InjectRepository(GHCNMAnomalyData)
    private readonly anomalyRepository: Repository<GHCNMAnomalyData>,
    @InjectRepository(GHCNMPrecipitationData)
    private readonly precipitationRepository: Repository<GHCNMPrecipitationData>,
    @InjectRepository(GHCNMAnnualCycleData)
    private readonly annualCycleRepository: Repository<GHCNMAnnualCycleData>,
    @InjectRepository(GHCNMCountryCode)
    private readonly countryRepository: Repository<GHCNMCountryCode>
  ) { }

  public async getAllStationMetadata(): Promise<GHCNMStationMetadataDto[]> {
    return this.stationMetadataRepository.find();
  }

  public async getAllBasicStationMetadata(): Promise<GHCNMBasicStationMetadataDto[]> {
    return this.stationMetadataRepository.createQueryBuilder()
      .select(['station', 'name'])
      .getRawMany();
  }

  public async getAllCountries(): Promise<GHCNMCountryDto[]> {
    const countries = await this.countryRepository.find();
    const countryRegions = await this.stationMetadataRepository
      .createQueryBuilder()
      .select('country, region')
      .distinct(true)
      .where('region IS NOT null')
      .getRawMany();

    const regionsPerCountry: Record<string, string[]> = countryRegions.reduce((accumulator, curr) => {
      const currArr = accumulator[curr.country] ?? [];
      return { ...accumulator, [curr.country]: [...currArr, curr.region] };    // for each country with supported regions, give it the array of regions it supports
    }, {});

    return countries.map(country => ({
      country: country.country,
      code: country.code,
      supportedRegions: regionsPerCountry[country.country] ?? []
    }));
  }

  public async getAllUniqueRegions(): Promise<string[]> {
    return this.stationMetadataRepository
      .createQueryBuilder()
      .select('region')
      .distinct(true)
      .where('region IS NOT null')
      .getRawMany();
  }

  public async getStationMetadata(
    format: 'metadata' | 'withAllData' | 'basic',  // return metadata, basic station info or full data for each station
    stationCodes: string[],
    countries: string[],
    regions: string[],
    coordinates: CoordinateRange[]
  ): Promise<GHCNMStationMetadataDto[] | GHCNMStationDataDto[] | GHCNMBasicStationMetadataDto[]> {

    const [whereSearchConditions, whereSearchParameters] = buildWhereConditions({ countries, regions, coordinates });
    const [stationWhereConditions, stationWhereParameters] = buildWhereConditions({ stations: stationCodes });

    // if a user selects specific stations in addition to station search parameters, assume they want the union of the two results

    const whereConditions = `(${whereSearchConditions.join(' AND ')})${stationCodes.length > 0 ? ` OR ${stationWhereConditions[0]}` : ''}`;
    const whereParameters = {...whereSearchParameters, ...stationWhereParameters};

    var selectColumns: string[] = [];

    console.log('where ', Object.values(whereSearchConditions).join(' AND '))
    console.log(whereSearchParameters)

    switch (format) {
      case 'metadata':
        selectColumns = ['station', 'name', 'region', 'country', 'region', 'latitude', 'longitude', 'elevation'];
        break;
      case 'withAllData':
        selectColumns = [];
        break;
      case 'basic':
        selectColumns = ['station', 'name'];
        break;
      default:
        console.log('bad format type');
    };

    return this.stationMetadataRepository.createQueryBuilder()
      .select(selectColumns)
      .where(whereConditions, whereParameters)
      .orderBy('station', 'ASC')
      .getRawMany();
  }

  // assumes you already have a list of filtered stations
  public async getMonthlyData(type: 'prcp' | 'anom', years: Range[], months: monthType[], stations: string[]): Promise<any[]> {
    const [whereConditions, whereParameters] = buildWhereConditions({ years, stations });

    const repository = type === 'prcp' ? this.precipitationRepository : this.anomalyRepository;

    // if no specific months are selected, don't filter on months
    const selectMonths: string[] = months.length === 0 ? ALL_MONTHS : months;

    console.log('monthly', whereConditions, whereParameters);

    return repository.createQueryBuilder()
      .select(['station', 'year', ...selectMonths])
      .where(Object.values(whereConditions).join(' AND '), whereParameters)
      .orderBy('station', 'ASC')
      .addOrderBy('year', 'ASC')
      .getRawMany();
  }

  public async getCyclesData(months: monthType[], stations: string[]): Promise<any[]> {
    if (stations.length === 0) return [];

    const [whereConditions, whereParameters] = buildWhereConditions({ months, stations });

    // console.log('where ', whereConditions)
    // console.log(whereParameters)

    return this.annualCycleRepository.createQueryBuilder()
      .select('*')
      .where(Object.values(whereConditions).join(' AND '), whereParameters)
      .orderBy('station', 'ASC')
      .addOrderBy('month', 'ASC')
      .getRawMany();
  }

  // option to return data by station (return array of full metadata + prcp, anom, and cycles cycle),
  // or to get just the raw numerical data (return object containing raw prcp, anom, and cycles daa)
  public async getDownloadData(byStation: boolean, params: downloadParams): Promise<any> {
    if (byStation) {

    }
    console.log(params)

    // if no filters are applied to find stations but specific stations are selected, this probably means that they only want that one particular station and not all of them
    // get all station metadata if the user wants station metadata - one API call
    const filteredStations: GHCNMBasicStationMetadataDto[] = ((params.countries.length === 0 && params.regions.length === 0 && params.coordinates.length === 0) && params.stations.length > 0) 
      ? [] : await this.getStationMetadata(params.dataTypes.includes('stations') ? 'metadata' : 'basic', params.stations, params.countries, params.regions, params.coordinates);
    const validStations: string[] = filteredStations.map((station: any) => station.station);
    // params.stations.forEach((station: string) => {
    //   if (!validStations.includes(station)) { validStations.push(station) }
    // });

    // if no valid stations are found, return empty arrays
    return {
      prcp: params.dataTypes.includes('prcp') && validStations.length > 0 ? await this.getMonthlyData('prcp', params.years, params.months, validStations) : [],
      anom: params.dataTypes.includes('anom') && validStations.length > 0 ? await await this.getMonthlyData('anom', params.years, params.months, validStations) : [],
      cycles: params.dataTypes.includes('cycles') && validStations.length > 0 ? await this.getCyclesData(params.months, validStations) : [],
      stations: params.dataTypes.includes('stations') && validStations.length > 0 ? filteredStations : []
    };
  }
}