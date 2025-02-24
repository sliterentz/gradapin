import { Controller, Get, Query, Version } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}
    
    @Version('1')
    @Get('list')
    getCountries(@Query('search') search?: string) {
        return this.countryService.getCountries(search);
    }
}