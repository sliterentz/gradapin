import { Injectable } from '@nestjs/common';
import { ApiDatasourceService } from '@libs/api-datasource';

@Injectable()
export class PopulationService {
    constructor(private apiService : ApiDatasourceService) {}
    
    getPopulationData(endpoint: string, countryCode: string, indicator: string, from: string, to: string): Promise<any> {
        return this.apiService.getData(endpoint, countryCode, indicator, from, to);
    }
}