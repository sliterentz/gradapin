import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
// import { ThrottlerModule } from '@nestjs/throttler';
import { PopulationService } from './population.service';
import { PopulationController } from './population.controller';
import { ApiDatasourceModule } from '../../libs/api-datasource/src/api-datasource.module';
import { RateLimitModule } from '../../libs/rate-limit/src/rate-limit.module';

@Module({
    imports: [HttpModule, ApiDatasourceModule, RateLimitModule.register()],
    controllers: [PopulationController],
    providers: [PopulationService],
})
export class PopulationModule {}
