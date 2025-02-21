import { forwardRef, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './book.model';
import { BookI18n } from 'src/book/book.i18n.model';
import { BookRepository } from './book.repository';
import { BookParameter } from './book.parameter.model';

@Module({
  imports: [SequelizeModule.forFeature([Book, BookI18n, BookParameter])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
