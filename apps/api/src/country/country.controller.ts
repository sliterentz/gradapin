import { Controller, Get, Query, Version, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { RateLimitGuard } from '../guards/rate-limit.guard';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}
    
    @Version('1')
    @Get('list')
    @UseGuards(RateLimitGuard)
    getCountries(@Query('search') search?: string) {
        return this.countryService.getCountries(search);
    }
}