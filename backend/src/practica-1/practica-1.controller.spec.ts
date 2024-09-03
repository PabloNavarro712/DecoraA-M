import { Test, TestingModule } from '@nestjs/testing';
import { Practica1Controller } from './practica-1.controller';

describe('Practica1Controller', () => {
  let controller: Practica1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Practica1Controller],
    }).compile();

    controller = module.get<Practica1Controller>(Practica1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
