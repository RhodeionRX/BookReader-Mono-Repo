import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './book.model';
import { BookI18n } from './book.i18n.model';
import { BookParameter } from './book.parameter.model';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository],
  imports: [SequelizeModule.forFeature([Book, BookI18n, BookParameter])],

})
export class BookModule {}
