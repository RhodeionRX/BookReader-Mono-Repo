import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { InitBookDto } from './dto/init-book.dto';
import { BookI18nService } from 'src/book_i18n/book_i18n.service';
import { RpcException } from '@nestjs/microservices';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { Op } from 'sequelize';
import { BookI18n } from 'src/book_i18n/book_i18n.model';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
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

  public async getAll(dto: GetAllBooksDto) {
    const { creator_account_id, title, i18n, articul } = dto;

    const whereScope: any = {};
    const whereI18n: any = {};

    if (creator_account_id) {
      whereScope.creator_account_id = creator_account_id;
    }

    if (articul) {
      whereScope.articul = {
        [Op.eq]: articul,
      };
    }

    if (title) {
      whereI18n.title = {
        [Op.iLike]: `%${title}%`,
      };
    }
    if (i18n) {
      whereI18n.i18n = i18n;
    }

    const books = await this.repository.findAll({
      where: whereScope,
      include: {
        model: BookI18n,
        where: whereI18n,
      },
    });

    return books;
  }

  public async getOne(id: string) {
    const book = await this.repository.findByPk(id);

    if (!book) {
      throw new RpcException('The book does not exist');
    }

    return book;
  }

  public async update(id: string, i18n: I18nEnum, dto: UpdateBookDto) {
    const book = await this.getOne(id);

    const { articul } = dto;
    book.update({ articul });
    book.save();

    const bookI18n = await this.bookI18nService.update(id, i18n, dto);

    return { book, bookI18n };
  }

  public async addI18n(id: string, dto: any) {
    const book = await this.getOne(id);

    if (!book) {
      throw new RpcException('This book does not exist');
    }

    const bookI18nCandidate = await this.bookI18nService.getOne(id, dto.i18n);

    if (bookI18nCandidate) {
      throw new RpcException('This localization already added');
    }

    const bookI18n = await this.bookI18nService.create({ bookId: id, ...dto });

    return { book, i18n: bookI18n };
  }

  public async destroy(id: string) {
    const book = await this.getOne(id);
    book.destroy();

    return book;
  }
}
