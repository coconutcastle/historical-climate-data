import { Controller, Query, Get, BadRequestException } from '@nestjs/common'
import { GHCNMStationMetadataDto } from './ghcnm.dto';
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
}