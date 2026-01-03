import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
// import { ThrottlerModule } from '@nestjs/throttler';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { RateLimitModule } from '../../libs/rate-limit/src/rate-limit.module';

@Module({
    imports: [HttpModule, RateLimitModule.register()],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule {}
