import { Injectable, Logger } from '@nestjs/common';
import { ApiDatasourceService } from '@libs/api-datasource';
import { AxiosError } from 'axios';
import { ApiSource } from '@libs/api-datasource/types/datasource.type';

@Injectable()
export class PopulationService {
    private readonly logger = new Logger(PopulationService.name);

    constructor(private apiService : ApiDatasourceService) {}
    
    async getPopulationData(endpoint: string, countryCode: string, indicator: string, from: string, to: string): Promise<any> {
        try {
            this.logger.log(`Fetching World Bank population data for country code: ${countryCode}`);
            await this.apiService.setSource(ApiSource.WORLD_BANK);  // Switch to World Bank API source if needed
            return this.apiService.getData(endpoint, countryCode, indicator, from, to);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                this.logger.warn(`World Bank population data not found for variable code: ${countryCode}`);
                return null; // or you could throw a custom error or return a specific message
            }
            this.logger.error(`Failed to fetch World Bank population data for variable code: ${countryCode}`, error.stack);
            throw new Error(`Failed to fetch World Bank population data: ${error.message}`);
        }
    }

    async getBPSPopulationData(variableCode: string): Promise<any> {
        try {
            this.logger.log(`Fetching BPS population data for variable code: ${variableCode}`);
            await this.apiService.setSource(ApiSource.BPS);  // Switch to BPS API source if needed
            const isList = true;  // Assuming we want the list of countries (true) for BPS API, adjust as needed.
            const response = await this.apiService.getData(variableCode, isList);
            if (response) {
                return response;
            } else {
                throw new Error('No BPS population data found');
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                this.logger.warn(`BPS population data not found for variable code: ${variableCode}`);
                return null; // or you could throw a custom error or return a specific message
            }
            this.logger.error(`Failed to fetch BPS population data for variable code: ${variableCode}`, error.stack);
            throw new Error(`Failed to fetch BPS population data: ${error.message}`);
        }
    }
}