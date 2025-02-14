import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PopulationModule } from './population/population.module';

@Module({
  imports: [HttpModule, PopulationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}