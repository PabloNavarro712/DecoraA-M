import { Test, TestingModule } from '@nestjs/testing';
import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyServiceService],
    }).compile();

    service = module.get<MyServiceService>(MyServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
