import { Controller, Query, Get, BadRequestException } from '@nestjs/common'
import { GHCNMStationMetadataDto, GHCNMCountryDto } from './ghcnm.dto';
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

  @Get('/countries')
  public async getAllCountries(): Promise<GHCNMCountryDto[]> {
    return this.ghcnmService.getAllCountries();
  }

  @Get('/regions')
  public async getAllRegions(): Promise<string[]> {
    return this.ghcnmService.getAllUniqueRegions();
  }
}