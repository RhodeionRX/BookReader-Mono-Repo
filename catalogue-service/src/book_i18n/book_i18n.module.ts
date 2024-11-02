import { Module } from '@nestjs/common';
import { BookI18nService } from './book_i18n.service';
import { BookI18nController } from './book_i18n.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookI18n } from './book_i18n.model';
import { Book } from 'src/book/book.model';

@Module({
  imports: [SequelizeModule.forFeature([BookI18n, Book])],
  controllers: [BookI18nController],
  providers: [BookI18nService],
  exports: [BookI18nService],
})
export class BookI18nModule {}
