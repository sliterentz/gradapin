import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import countries from './countries';

@Injectable()
export class PopulationService {
    private readonly baseUrl = 'https://api.worldbank.org/v2';
    
    constructor(private httpService: HttpService) {}
    
    getPopulationData(countryCode: string, indicator: string, from: string, to: string): Observable<any> {
        const url = `${this.baseUrl}/country/${countryCode}/indicator/${indicator}`;
        const params = {
            date: `${from}:${to}`,
            format: 'json'
        };

        return this.httpService.get(url, { params }).pipe(
            map(response => response.data)
        );
    }

    getCountries(search?: string): Observable<any> {
      return of(countries).pipe(
        map(allCountries => {
            if (search) {
                const searchLower = search.toLowerCase();
                return allCountries.filter(country => 
                    country.name.toLowerCase().includes(searchLower)
                );
            }
            return allCountries;
        })
      );
    }
}