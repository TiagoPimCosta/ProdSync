import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from '../records.controller';
import { RecordsService } from '../records.service';

describe('RecordsController', () => {
  let controller: RecordsController;
  const recordsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [{ provide: RecordsService, useValue: recordsService }],
    }).compile();

    controller = module.get<RecordsController>(RecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('derives the user from the authenticated JWT', async () => {
      recordsService.create.mockResolvedValue({
        statusCode: 200,
        message: 'Ação registada com sucesso',
      });

      await controller.create({ machineId: '3' }, '1');

      expect(recordsService.create).toHaveBeenCalledWith({
        machineId: '3',
        userId: '1',
      });
    });

    it('ignores any userId sent in the body', async () => {
      recordsService.create.mockResolvedValue({
        statusCode: 200,
        message: 'Ação registada com sucesso',
      });

      await controller.create(
        { machineId: '3', userId: '99' } as never,
        '1',
      );

      expect(recordsService.create).toHaveBeenCalledWith({
        machineId: '3',
        userId: '1',
      });
    });
  });
});
