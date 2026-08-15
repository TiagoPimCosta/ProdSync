import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from '../records.controller';
import { RecordsService } from '../records.service';

const MACHINE_ID = '2f9d9c1e-1f2a-4b4d-9d6e-6b0a1a1c1d2e';
const USER_ID = '7c1b9f0a-5d3e-4a2b-8c6f-1e2d3c4b5a69';
const LINE_ID = 'ab3f5d21-9c84-4e77-b0d1-2f6a8e9c0b13';

describe('RecordsController', () => {
  let controller: RecordsController;
  const recordsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    getAvgActionTime: jest.fn(),
    getRecordsHistory: jest.fn(),
    getHourlyRecordCounts: jest.fn(),
    getDailyRecordCounts: jest.fn(),
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

  // The stats endpoints used to run parseInt() over these ids, which turns a
  // UUID into NaN before it ever reaches the query builder.
  describe('UUID ids reach the service untouched', () => {
    it('forwards the filters of GET /records', async () => {
      const pagination = { page: 0, limit: 10, size: 10, offset: 0 };

      await controller.findAll(pagination, USER_ID, MACHINE_ID);

      expect(recordsService.findAll).toHaveBeenCalledWith(
        pagination,
        USER_ID,
        MACHINE_ID,
        undefined,
        undefined,
      );
    });

    it('forwards the ids of GET /records/avgActionTime', async () => {
      await controller.getAvgActionTime(MACHINE_ID, USER_ID, '2026-01-01');

      expect(recordsService.getAvgActionTime).toHaveBeenCalledWith(
        MACHINE_ID,
        USER_ID,
        '2026-01-01',
        undefined,
      );
    });

    it('forwards the id of GET /records/recordHistory', async () => {
      await controller.getRecordsHistory(USER_ID);

      expect(recordsService.getRecordsHistory).toHaveBeenCalledWith(USER_ID);
    });

    it('forwards the ids of GET /records/hourlyStats', async () => {
      await controller.getHourlyStats(
        '2026-01-01',
        '2026-01-02',
        USER_ID,
        LINE_ID,
        MACHINE_ID,
      );

      expect(recordsService.getHourlyRecordCounts).toHaveBeenCalledWith(
        '2026-01-01',
        '2026-01-02',
        USER_ID,
        LINE_ID,
        MACHINE_ID,
      );
    });

    it('forwards the ids of GET /records/dailyStats', async () => {
      await controller.getDaylyStats(
        '2026-01-01',
        '2026-01-02',
        USER_ID,
        LINE_ID,
        MACHINE_ID,
      );

      expect(recordsService.getDailyRecordCounts).toHaveBeenCalledWith(
        '2026-01-01',
        '2026-01-02',
        USER_ID,
        LINE_ID,
        MACHINE_ID,
      );
    });
  });
});
