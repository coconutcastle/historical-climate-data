import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { GHCNM } from "./ghcnm.entity";
import { GHCNMService } from "./ghcnm.service";
import { GHCNMController } from "./ghcnm.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([GHCNM])
    ],
    controllers: [GHCNMController],
    providers: [GHCNMService]
})

export class GHCNModule {}