import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BookI18nModule } from './book_i18n/book_i18n.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    DatabaseModule,
    BookModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BookI18nModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
