import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { BookModule } from './book/book.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { BookController } from './book/book.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '*/book/*', method: RequestMethod.GET })
      .forRoutes(BookController);
  }
}
