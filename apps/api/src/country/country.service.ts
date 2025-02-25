import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import countries from './countries';

@Injectable()
export class CountryService {

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