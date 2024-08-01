import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../config/typeorm.config';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    RecordsModule,
    UsersModule,
    AuthModule,
    MachinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
