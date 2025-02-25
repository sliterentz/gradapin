import { Test, TestingModule } from '@nestjs/testing';
import { ApiDatasourceService } from './api-datasource.service';

describe('ApiDatasourceService', () => {
  let service: ApiDatasourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiDatasourceService],
    }).compile();

    service = module.get<ApiDatasourceService>(ApiDatasourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
