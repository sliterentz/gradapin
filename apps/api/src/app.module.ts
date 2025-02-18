import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PopulationModule } from './population/population.module';
import { CountryModule } from './country/country.module';
import { ApiDatasourceModule } from '@libs/api-datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    HttpModule, PopulationModule, CountryModule, ApiDatasourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}