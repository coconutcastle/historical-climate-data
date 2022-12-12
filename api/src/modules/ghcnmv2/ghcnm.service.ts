import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GHCNMCountryDto, GHCNMStationMetadataDto } from './ghcnm.dto'
import { GHCNMAnnualCycleData, GHCNMAnomalyData, GHCNMCountryCode, GHCNMPrecipitationData, GHCNMStationMetadata } from './ghcnm.entity'

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
  ) {}

  public async getAllStationMetadata(): Promise<GHCNMStationMetadataDto[]> {
    const metadata = await this.stationMetadataRepository.find();
    return metadata.map(station => ({
      code: station.station,
      identifier: station.identifier,
      name: station.name,
      region: station.region,
      country: station.country,
      latitude: station.latitude,
      longitude: station.longitude,
      elevation: station.elevation
    }));
  }

  public async getAllCountries(): Promise<GHCNMCountryDto[]> {
    const countries = await this.countryRepository.find();
    return countries.map(country => ({
      country: country.country,
      code: country.code,
      supportedRegions: []
    }));
  }
}