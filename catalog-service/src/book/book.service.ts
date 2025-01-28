import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { InitBookDto } from './dto/init-book.dto';
import { BookI18nService } from 'src/book_i18n/book_i18n.service';
import { RpcException } from '@nestjs/microservices';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
import { AddI18nDto } from './dto/add-i18n.dto';
import { BookRepository } from './book.repository';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book) private repositoryOld: typeof Book,
    private repository: BookRepository,
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

      const translations = await this.bookI18nService.create({
        bookId: book.id,
        i18n,
        title,
        description,
      });

      // TODO get rid of JSON.stringify
      const cleanBook = JSON.parse(JSON.stringify(book));

      const result = {
        ...cleanBook,
        translations,
      };

      return result;
    } catch (error) {
      throw new RpcException(error.message ?? 'Unknown exception');
    }
  }

  public async getAll(dto: GetAllBooksDto) {
    const { creator_account_id, title, i18n, articul, size, page } = dto;
    const localization = i18n ?? I18nEnum.ENGLISH;

    const books = await this.repository.find({
      creator_account_id,
      title,
      articul,
      size,
      page,
    });

    const booksWithAppliedI18n = [];

    books.rows.forEach((book) => {
      let translation = {};

      // Search the translation matching requested localization
      translation = book.translations.find(
        (translation) => translation.i18n === localization,
      );

      // If not translation found attempt to search one with english localization
      if (!translation) {
        translation = book.translations.find(
          (translation) => translation.i18n === I18nEnum.ENGLISH,
        );
      }

      // If even english localization fails then apply the first translation in the list or null
      if (!translation) {
        translation = book.translations[0] ?? null;
      }

      const cleanBook = book.toJSON();
      booksWithAppliedI18n.push({ ...cleanBook, translations: translation });
    });

    return {
      count: books.count,
      rows: booksWithAppliedI18n,
    };
  }

  public async getOne(id: string, i18n: I18nEnum = I18nEnum.ENGLISH) {
    const book = await this.repository.findOneOrFail({ id });

    return book;
  }

  public async update(id: string, i18n: I18nEnum, dto: UpdateBookDto) {
    const { articul } = dto;

    const book = await this.repository.update(id, { articul });
    const translations = await this.bookI18nService.update(id, i18n, dto);

    // TODO get rid of JSON.stringify
    const cleanBook = JSON.parse(JSON.stringify(book));

    const result = {
      ...cleanBook,
      translations,
    };

    return result;
  }

  public async addI18n(id: string, dto: AddI18nDto) {
    const book = await this.repository.findOneOrFail({ id });

    const bookI18nCandidate = await this.bookI18nService.getOne(id, dto.i18n);

    if (bookI18nCandidate) {
      throw new RpcException('This localization already added');
    }

    const translations = await this.bookI18nService.create({
      bookId: id,
      ...dto,
    });

    // TODO get rid of JSON.stringify
    const cleanBook = JSON.parse(JSON.stringify(book));

    const result = {
      ...cleanBook,
      translations,
    };

    return result;
  }

  public async destroy(id: string) {
    const book = await this.repository.delete(id);
    return book;
  }
}
