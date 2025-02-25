import { Controller, Get, Param, Query, Version, UseGuards } from '@nestjs/common';
import { PopulationService } from './population.service';
import { RateLimitGuard } from '../guards/rate-limit.guard';

@Controller('population')
export class PopulationController {
    constructor(private readonly populationService: PopulationService) {}

    @Version('1')
    @Get('country/:countryCode/indicator/:indicator')
    @UseGuards(RateLimitGuard)
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
        return this.populationService.getPopulationData('country', countryCode, indicator, from, to);
    }

    @Version('1')
    @Get('variable/:var')
    @UseGuards(RateLimitGuard)
    getBPSPopulationData(
        @Param('var') variableCode: string,
        // @Query('format') format: string = 'json'
    ) {
        return this.populationService.getBPSPopulationData(variableCode);
    }
}