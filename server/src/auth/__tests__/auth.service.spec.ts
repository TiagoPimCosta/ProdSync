import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from 'src/utils/password';

describe('AuthService', () => {
  let service: AuthService;
  const findOneByUsername = jest.fn();
  const sign = jest.fn().mockReturnValue('signed-token');

  const buildUser = async (overrides = {}) => ({
    id: 'a3f1d0c2-0000-4000-8000-000000000001',
    username: 'Tiago',
    password: await hashPassword('1234567'),
    role: 'admin',
    status: true,
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findOneByUsername } },
        { provide: JwtService, useValue: { sign } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('signs a token when the password matches the stored hash', async () => {
    const user = await buildUser();
    findOneByUsername.mockResolvedValue(user);

    await expect(
      service.validateUser({ username: 'Tiago', password: '1234567' }),
    ).resolves.toEqual({ token: 'signed-token' });

    expect(sign).toHaveBeenCalledWith(
      expect.not.objectContaining({ password: expect.anything() }),
    );
  });

  it('rejects the plaintext-equals-hash shortcut', async () => {
    const user = await buildUser();
    findOneByUsername.mockResolvedValue(user);

    await expect(
      service.validateUser({ username: 'Tiago', password: user.password }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects a wrong password', async () => {
    findOneByUsername.mockResolvedValue(await buildUser());

    await expect(
      service.validateUser({ username: 'Tiago', password: '7654321' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects an inactive user', async () => {
    findOneByUsername.mockResolvedValue(await buildUser({ status: false }));

    await expect(
      service.validateUser({ username: 'Tiago', password: '1234567' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects an unknown user', async () => {
    findOneByUsername.mockResolvedValue(null);

    await expect(
      service.validateUser({ username: 'ghost', password: '1234567' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
