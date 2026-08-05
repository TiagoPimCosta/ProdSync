import { Controller, Get, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { JwtGuard } from '../guards/jwt.guards';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { Public } from '../decorators/public.decorator';

@Controller('t')
class TestController {
  @Get('private') priv() {
    return 'priv';
  }
  @Public() @Get('public') pub() {
    return 'pub';
  }
}

describe('global JwtGuard', () => {
  let app: INestApplication;
  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';
    const mod = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PassportModule],
      controllers: [TestController],
      providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtGuard }],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
  });
  afterAll(async () => app.close());

  it('401s unauthenticated routes', () =>
    request(app.getHttpServer()).get('/t/private').expect(401));
  it('allows @Public routes', () =>
    request(app.getHttpServer()).get('/t/public').expect(200));
});
