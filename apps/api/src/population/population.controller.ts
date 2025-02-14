import { Controller, Get, Param, Query } from '@nestjs/common';
import { PopulationService } from './population.service';

@Controller('api/v1/')
export class PopulationController {
    constructor(private readonly populationService: PopulationService) {}
    
    @Get('country')
    getCountries(@Query('search') search?: string) {
        return this.populationService.getCountries(search);
    }

    @Get('country/:countryCode/indicator/:indicator')
    getPopulationData(
        @Param('countryCode') countryCode: string,
        @Param('indicator') indicator: string,
        @Query('date') date: string,
        @Query('format') format: string = 'json'
    ) {
        const [from, to] = date ? date.split(':') : [null, null];
        if (!from || !to) {
            throw new Error('Invalid date range. Please provide a date range in the format "YYYY:YYYY"');
        }
        return this.populationService.getPopulationData(countryCode, indicator, from, to);
    }
}