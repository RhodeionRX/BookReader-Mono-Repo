import { forwardRef, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './book.model';
import { BookI18nModule } from 'src/book_i18n/book_i18n.module';
import { BookI18n } from 'src/book_i18n/book_i18n.model';
import { BookRepository } from './book.repository';

@Module({
  imports: [SequelizeModule.forFeature([Book, BookI18n]), BookI18nModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
