import { Controller, Query, Get, BadRequestException } from '@nestjs/common'
import { GHCNMStationMetadataDto, GHCNMCountryDto, GHCNMBasicStationMetadataDto } from './ghcnm.dto';
import { CoordinateRange, CountryInfo, DataTypes, downloadParams, GHCNMBasicStationMetadata, monthType, Range } from './ghcnm.interface';
import { GHCNMService } from './ghcnm.service';

@Controller('ghcnmv2')
export class GHCNMController {
  constructor(
    private readonly ghcnmService: GHCNMService
  ) {}
  
  @Get('/station')
  public async getAllStationMetadata(): Promise<GHCNMStationMetadataDto[]> {
    return this.ghcnmService.getAllStationMetadata();
  }

  @Get('/basic/station')
  public async getAllBasicStationMetadata(): Promise<GHCNMBasicStationMetadataDto[]> {
    return this.ghcnmService.getAllBasicStationMetadata();
  }

  @Get('/countries')
  public async getAllCountries(): Promise<GHCNMCountryDto[]> {
    return this.ghcnmService.getAllCountries();
  }

  @Get('/regions')
  public async getAllRegions(): Promise<string[]> {
    return this.ghcnmService.getAllUniqueRegions();
  }

  @Get('/download')
  public async getDownloadData(
    @Query('byStation') byStation: boolean,
    @Query('years') years: Range[] = [],
    @Query('months') months: string[] = [],
    @Query('countries') countries: CountryInfo[] = [],
    @Query('regions') regions: string[] = [],
    @Query('coordinates') coordinates: CoordinateRange[] = [],
    @Query('stations') stations: GHCNMBasicStationMetadata[] = [],
    @Query('dataTypes') dataTypes: DataTypes[] = []
  ): Promise<any> {
    const params: downloadParams = {
      years,
      months: months.map((month: string) => (month.toLowerCase() as monthType)),
      countries: countries.map((country: CountryInfo) => country.country),    //makes it easier to identify stations to use name over code
      regions,
      coordinates,
      stations: stations.map((station: GHCNMBasicStationMetadata) => station.station),
      dataTypes
    };
    return this.ghcnmService.getDownloadData(byStation, params);
  }
}