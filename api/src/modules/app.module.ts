import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'src/common/logger.middleware';
import { GHCNMController } from './ghcnmv2/ghcnm.controller';
import { GHCNModule } from './ghcnmv2/ghcnm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // host: process.env.DATABASE_HOST,
      // port: parseInt(process.env.DATABASE_PORT ?? '5432'),
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      // entities: [__dirname + '/**/*.entity.ts'],
      // synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE)
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'data126',
      database: 'climatedata',
      entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],      
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres' as 'postgres',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: parseInt(configService.get<string>('DATABASE_PORT') ?? '5432'),
    //     username: configService.get<string>('DATABASE_USER'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    GHCNModule,
  ]
})

export class AppModule implements NestModule {

  constructor(private configService: ConfigService) {}

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(GHCNMController)
  }
}
