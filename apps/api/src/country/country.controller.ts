import { Controller, Get, Query, Version, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { Throttle } from '@nestjs/throttler';
import { RateLimitGuard } from '../../libs/rate-limit/src/guards/rate-limit.guard';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}
    
    @Version('1')
    @Get('list')
    @UseGuards(RateLimitGuard)
    @Throttle({ default: { limit: 4, ttl: 3600} })
    getCountries(@Query('search') search?: string) {
        return this.countryService.getCountries(search);
    }
}