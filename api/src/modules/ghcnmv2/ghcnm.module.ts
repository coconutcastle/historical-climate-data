import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { GHCNMStationMetadata, GHCNMAnomalyData, GHCNMAnomalyPercentageData, GHCNMPrecipitationData, GHCNMAnnualCycleData, GHCNMCountryCode } from "./ghcnm.entity";
import { GHCNMService } from "./ghcnm.service";
import { GHCNMController } from "./ghcnm.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GHCNMStationMetadata,
      GHCNMAnomalyData,
      GHCNMAnomalyPercentageData,
      GHCNMPrecipitationData,
      GHCNMAnnualCycleData,
      GHCNMCountryCode])
  ],
  controllers: [GHCNMController],
  providers: [GHCNMService],
  exports: [GHCNMService]
})

export class GHCNModule { }