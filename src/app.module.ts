import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';

import config from 'config';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
