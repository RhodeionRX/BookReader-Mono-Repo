import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { InitBookDto } from './dto/init-book.dto';
import { BookI18nService } from 'src/book_i18n/book_i18n.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book) private repository: typeof Book,
    private bookI18nService: BookI18nService,
  ) {}

  public async create(dto: InitBookDto) {
    try {
      const { articul, userId, title, i18n, description } = dto;

      const book = await this.repository.create({
        creator_account_id: userId,
        articul,
      });

      if (!book) {
        throw new RpcException('Book is not created');
      }

      const bookI18n = await this.bookI18nService.create({
        bookId: book.id,
        i18n,
        title,
        description,
      });

      const response = {
        book,
        translations: [bookI18n],
      };

      return response;
    } catch (error) {
      throw new RpcException(error.message ?? 'Unknown exception');
    }
  }
}
