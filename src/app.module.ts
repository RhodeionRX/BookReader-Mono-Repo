import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    AccountModule,
    BookModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: ValidationExceptionFilter }],
})
export class AppModule {}
