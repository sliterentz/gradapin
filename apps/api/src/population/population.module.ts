import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { PopulationService } from './population.service';
import { PopulationController } from './population.controller';
import { ApiDatasourceModule } from '../../libs/api-datasource/src/api-datasource.module';
import { RateLimitGuard } from '../../libs/rate-limit/src/guards/rate-limit.guard';
import { RateLimitService } from '../../libs/rate-limit/src/rate-limit.service';

@Module({
    imports: [HttpModule, ApiDatasourceModule, ThrottlerModule],
    controllers: [PopulationController],
    providers: [PopulationService, RateLimitGuard, RateLimitService],
})
export class PopulationModule {}