import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { UsersService } from '../users.service';
import { User } from 'src/helpers/typeorm/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const queryBuilder = {
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };

  const userRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('never selects the password column by default', () => {
    const passwordColumn = getMetadataArgsStorage().columns.find(
      (column) => column.target === User && column.propertyName === 'password',
    );

    expect(passwordColumn?.options.select).toBe(false);
  });

  it('opts back into the password only for the username lookup', async () => {
    queryBuilder.getOne.mockResolvedValue({ id: 'u1', password: 'hash' });

    await expect(service.findOneByUsername('Tiago')).resolves.toEqual({
      id: 'u1',
      password: 'hash',
    });

    expect(queryBuilder.addSelect).toHaveBeenCalledWith('user.password');
    expect(queryBuilder.where).toHaveBeenCalledWith(
      'user.username = :username',
      { username: 'Tiago' },
    );
  });

  it('returns null for an unknown username instead of throwing', async () => {
    queryBuilder.getOne.mockResolvedValue(null);

    await expect(service.findOneByUsername('ghost')).resolves.toBeNull();
  });
});
