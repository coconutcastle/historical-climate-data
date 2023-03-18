import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { buildWhereConditions } from '../../common/helpers'
import { Repository } from 'typeorm'
import { GHCNMCountryDto, GHCNMStationMetadataDto, GHCNMBasicStationMetadataDto, GHCNMStationDataDto } from './ghcnm.dto'
import { GHCNMAnnualCycleData, GHCNMAnomalyData, GHCNMAnomalyPercentageData, GHCNMCountryCode, GHCNMPrecipitationData, GHCNMStationMetadata } from './ghcnm.entity'
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
    @InjectRepository(GHCNMAnomalyPercentageData)
    private readonly anomalyPercentageRepository: Repository<GHCNMAnomalyData>,
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

    const regionsPerCountry: Record<string, string[]> = countryRegions.reduce((accumulator: any, curr: any) => {
      const currArr = accumulator[curr.country] ?? [];
      return { ...accumulator, [curr.country]: [...currArr, curr.region] };    // for each country with supported regions, give it the array of regions it supports
    }, {});

    return countries.map((country: any) => ({
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
    // const whereConditions: string = [whereSearchConditions.join(' AND '), stationWhereConditions[0]].join(' OR ')
    const whereConditions = `${whereSearchConditions.length > 0 ? `(${whereSearchConditions.join(' AND ')})` : ''}${whereSearchConditions.length > 0 && stationCodes.length > 0 ? ' OR ' : ''}${stationCodes.length > 0 ? `(${stationWhereConditions[0]})` : ''}`;
    const whereParameters = {...whereSearchParameters, ...stationWhereParameters};

    var selectColumns: string[] = [];

    console.log('where ', whereConditions)
    console.log(whereParameters)

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
  public async getMonthlyData(type: 'prcp' | 'anom' | 'anom_pcnt', years: Range[], months: monthType[], stations: string[]): Promise<any[]> {
    const [whereConditions, whereParameters] = buildWhereConditions({ years, stations });

    const repository = type === 'prcp' ? this.precipitationRepository : 
      (type === 'anom' ? this.anomalyRepository : this.anomalyPercentageRepository);

    // if no specific months are selected, don't filter on months
    const selectMonths: string[] = months.length === 0 ? ALL_MONTHS : months;

    console.log('monthly', whereConditions, whereParameters);

    return repository.createQueryBuilder()
      .select(['station', 'year', ...selectMonths])
      .where(whereConditions.join(' AND '), whereParameters)
      .orderBy('station', 'ASC')
      .addOrderBy('year', 'ASC')
      .getRawMany();
  }

  // TODO: put the actual percentile numbers for each percentile value
  public async getCyclesData(months: monthType[], stations: string[]): Promise<any[]> {
    if (stations.length === 0) return [];

    const [whereConditions, whereParameters] = buildWhereConditions({ months, stations });

    // console.log('where ', whereConditions)
    // console.log(whereParameters)

    return this.annualCycleRepository.createQueryBuilder()
      // .select('*')
      .select(['station', 'month', 'mean', 'standard_deviation', 'ARRAY["2_5", "17", "50", "83", "97_5"] AS percentiles'])
      .where(whereConditions.join(' AND '), whereParameters)
      .orderBy('station', 'ASC')
      .getRawMany();
  }

  // option to return data by station (return array of full metadata + prcp, anom, and cycles cycle),
  // or to get just the raw numerical data (return object containing raw prcp, anom, and cycles daa)
  public async getDownloadData(byStation: boolean, params: downloadParams): Promise<any> {
    if (byStation) {

    }
    console.log(params)

    // what to do if no search params are selected, or column params for monthly data? behaviour is a bit weird here

    // if no filters are applied to find stations but specific stations are selected, this probably means that they only want that one particular station and not all of them
    // get all station metadata if the user wants station metadata - one API call
    const filteredStations: GHCNMBasicStationMetadataDto[] = await this.getStationMetadata(params.dataTypes.includes('stations') ? 'metadata' : 'basic', params.stations, params.countries, params.regions, params.coordinates);
    const validStations: string[] = filteredStations.map((station: any) => station.station);

    // console.log('stations are ', validStations)

    // if no valid stations are found, return empty arrays
    return {
      prcp: params.dataTypes.includes('prcp') && validStations.length > 0 ? await this.getMonthlyData('prcp', params.years, params.months, validStations) : [],
      anom: params.dataTypes.includes('anom') && validStations.length > 0 ? await this.getMonthlyData('anom', params.years, params.months, validStations) : [],
      anom_pcnt: params.dataTypes.includes('anom_pcnt') && validStations.length > 0 ? await this.getMonthlyData('anom_pcnt', params.years, params.months, validStations) : [],
      cycles: params.dataTypes.includes('cycles') && validStations.length > 0 ? await this.getCyclesData(params.months, validStations) : [],
      stations: params.dataTypes.includes('stations') && validStations.length > 0 ? filteredStations : []
    };
  }
}