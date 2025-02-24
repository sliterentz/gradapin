import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiDatasourceService } from './api-datasource.service';
import { WorldBankApiService } from './clients/word-bank-api.service';
import { BpsApiService } from './clients/bps-api.service';

@Module({
  imports: [HttpModule],
  providers: [ApiDatasourceService, WorldBankApiService, BpsApiService],
  exports: [ApiDatasourceService],
})
export class ApiDatasourceModule {}
