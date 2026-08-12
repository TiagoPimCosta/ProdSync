import { ValidationPipe } from '@nestjs/common';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../users.dto';
import { CreateRecordRequestDto } from '../records.dto';
import { CreateLineRequestDto } from '../lines.dto';
import { CreateMachineRequestDto, UpdateMachineUserDto } from '../machines.dto';

const UUID = '2f9d9c1e-1f2a-4b4d-9d6e-6b0a1a1c1d2e';

// The same configuration AppModule registers globally.
const pipe = new ValidationPipe({ whitelist: true, transform: true });

const run = <T>(metatype: new () => T, value: unknown) =>
  pipe.transform(value, { type: 'body', metatype });

const validUser = {
  idNumber: 7,
  name: 'Maria Costa',
  role: 'user',
  username: 'maria',
  password: '1234567',
  cc: '12345678',
  nif: '987654321',
  phone: '912345678',
  email: 'maria@factory.com',
};

describe('global ValidationPipe against the request DTOs', () => {
  describe('CreateUserRequestDto', () => {
    it('accepts a well-formed user', async () => {
      await expect(run(CreateUserRequestDto, validUser)).resolves.toMatchObject(
        validUser,
      );
    });

    it('rejects the arbitrary shapes POST /api/users used to accept', async () => {
      await expect(run(CreateUserRequestDto, {})).rejects.toThrow();
      await expect(run(CreateUserRequestDto, { foo: 'bar' })).rejects.toThrow();
    });

    it('rejects a malformed email, nif and idNumber', async () => {
      await expect(
        run(CreateUserRequestDto, { ...validUser, email: 'not-an-email' }),
      ).rejects.toThrow();
      await expect(
        run(CreateUserRequestDto, { ...validUser, nif: '123' }),
      ).rejects.toThrow();
      await expect(
        run(CreateUserRequestDto, { ...validUser, idNumber: 'seven' }),
      ).rejects.toThrow();
    });

    it('rejects a role outside the Role enum', async () => {
      await expect(
        run(CreateUserRequestDto, { ...validUser, role: 'superadmin' }),
      ).rejects.toThrow();
    });

    it('strips properties that are not part of the DTO', async () => {
      const result = await run(CreateUserRequestDto, {
        ...validUser,
        id: 'injected',
        status: false,
      });

      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('status');
    });
  });

  describe('UpdateUserRequestDto', () => {
    it('accepts a partial body', async () => {
      await expect(
        run(UpdateUserRequestDto, { name: 'Maria Braga' }),
      ).resolves.toEqual({ name: 'Maria Braga' });
    });

    it('drops password, so the update can never rewrite the hash', async () => {
      const result = await run(UpdateUserRequestDto, {
        name: 'Maria Braga',
        password: 'plaintext',
      });

      expect(result).toEqual({ name: 'Maria Braga' });
    });

    it('still validates the fields that are present', async () => {
      await expect(
        run(UpdateUserRequestDto, { email: 'nope' }),
      ).rejects.toThrow();
    });
  });

  describe('id-carrying DTOs', () => {
    it('requires real UUIDs', async () => {
      await expect(
        run(CreateRecordRequestDto, { machineId: UUID }),
      ).resolves.toEqual({ machineId: UUID });
      await expect(
        run(CreateRecordRequestDto, { machineId: '1' }),
      ).rejects.toThrow();
      await expect(
        run(UpdateMachineUserDto, { userId: '1' }),
      ).rejects.toThrow();
    });
  });

  describe('CreateLineRequestDto / CreateMachineRequestDto', () => {
    it('requires a non-empty name', async () => {
      await expect(run(CreateLineRequestDto, { name: '' })).rejects.toThrow();
      await expect(
        run(CreateLineRequestDto, { name: 'Line A' }),
      ).resolves.toEqual({ name: 'Line A' });
    });

    it('requires a positive integer cadence and a line UUID', async () => {
      await expect(
        run(CreateMachineRequestDto, {
          name: 'Machine A1',
          line: UUID,
          cadence: 0,
        }),
      ).rejects.toThrow();
      await expect(
        run(CreateMachineRequestDto, {
          name: 'Machine A1',
          line: 'line-a',
          cadence: 10,
        }),
      ).rejects.toThrow();
      await expect(
        run(CreateMachineRequestDto, {
          name: 'Machine A1',
          line: UUID,
          cadence: 10,
        }),
      ).resolves.toMatchObject({ cadence: 10 });
    });
  });
});
