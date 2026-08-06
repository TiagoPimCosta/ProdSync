import { Controller, Get, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { JwtGuard } from '../guards/jwt.guards';
import { RolesGuard } from '../guards/roles.guard';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';

@Controller('t')
class TestController {
  @Get('any') any() {
    return 'any';
  }
  @Roles(Role.Admin) @Get('admin') admin() {
    return 'admin';
  }
  @Public() @Get('public') pub() {
    return 'pub';
  }
}

@Controller('c')
@Roles(Role.Admin)
class AdminOnlyController {
  @Get('anything') anything() {
    return 'anything';
  }
}

describe('global RolesGuard', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  const tokenFor = (role: string) => jwtService.sign({ id: 'u1', role });

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';
    const mod = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({ secret: 'test-secret' }),
      ],
      controllers: [TestController, AdminOnlyController],
      providers: [
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
      ],
    }).compile();
    app = mod.createNestApplication();
    jwtService = mod.get(JwtService);
    await app.init();
  });
  afterAll(async () => app.close());

  it('allows any authenticated role on undecorated routes', () =>
    request(app.getHttpServer())
      .get('/t/any')
      .set('Authorization', `Bearer ${tokenFor('user')}`)
      .expect(200));

  it('403s a non-admin on an admin route', () =>
    request(app.getHttpServer())
      .get('/t/admin')
      .set('Authorization', `Bearer ${tokenFor('user')}`)
      .expect(403));

  it('allows an admin on an admin route', () =>
    request(app.getHttpServer())
      .get('/t/admin')
      .set('Authorization', `Bearer ${tokenFor('admin')}`)
      .expect(200));

  it('matches the role case-insensitively', () =>
    request(app.getHttpServer())
      .get('/t/admin')
      .set('Authorization', `Bearer ${tokenFor('Admin')}`)
      .expect(200));

  it('applies a controller-level @Roles to every handler', () =>
    request(app.getHttpServer())
      .get('/c/anything')
      .set('Authorization', `Bearer ${tokenFor('user')}`)
      .expect(403));

  it('401s an unauthenticated controller-level @Roles route', () =>
    request(app.getHttpServer()).get('/c/anything').expect(401));

  it('leaves @Public routes open', () =>
    request(app.getHttpServer()).get('/t/public').expect(200));

  it('still 401s an unauthenticated admin route', () =>
    request(app.getHttpServer()).get('/t/admin').expect(401));
});
