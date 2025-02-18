import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PopulationService } from './population.service';
import { PopulationController } from './population.controller';
import { ApiDatasourceModule } from '@libs/api-datasource';

@Module({
    imports: [HttpModule, ApiDatasourceModule],
    controllers: [PopulationController],
    providers: [PopulationService],
})
export class PopulationModule {}