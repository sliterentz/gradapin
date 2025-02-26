import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { RateLimitGuard } from '../../libs/rate-limit/src/guards/rate-limit.guard';
import { RateLimitService } from '../../libs/rate-limit/src/rate-limit.service';

@Module({
    imports: [HttpModule, ThrottlerModule],
    controllers: [CountryController],
    providers: [CountryService, RateLimitGuard, RateLimitService],
})
export class CountryModule {}