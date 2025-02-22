import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { InitBookDto } from './dto/init-book.dto';
import { RpcException } from '@nestjs/microservices';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
import { AddI18nDto } from './dto/add-i18n.dto';
import { BookRepository } from './book.repository';
import { BookParameter } from './book.parameter.model';
import { BookI18n } from './book.i18n.model';

@Injectable()
export class BookService {
  constructor(private repository: BookRepository) {}

  public async create(dto: InitBookDto) {
    try {
      const { articul, userId, title, i18n, description, parameters } = dto;

      const book = await this.repository.create({
        creator_account_id: userId,
        articul,
      });

      if (!book) {
        throw new RpcException('Book is not created');
      }

      const translations = await this.repository.addI18n({
        bookId: book.id,
        i18n,
        title,
        description,
      });

      let bookParameters: BookParameter[] = [];

      if (parameters) {
        bookParameters = await this.repository.addParameters(
          parameters,
          book.id,
          i18n,
        );
      }

      const result = {
        ...book.toJSON(),
        translations,
        ...(bookParameters && { parameters: bookParameters }),
      };

      return result;
    } catch (error) {
      throw new RpcException(error.message ?? 'Unknown exception');
    }
  }

  public async getAll(dto: GetAllBooksDto) {
    const { creator_account_id, title, i18n, articul, size, page } = dto;
    const localization = i18n ?? I18nEnum.EN;

    const books = await this.repository.find({
      creator_account_id,
      title,
      articul,
      size,
      page,
      i18n: localization,
    });

    const booksWithAppliedI18n = [];

    books.rows.forEach((book) => {
      const bookWithSpecifiedI18n = this.retrieveSingleTranslation(
        book,
        localization,
      );

      booksWithAppliedI18n.push(bookWithSpecifiedI18n);
    });

    return {
      count: books.count,
      rows: booksWithAppliedI18n,
    };
  }

  public async getOne(id: string, i18n: I18nEnum = I18nEnum.EN) {
    const book = await this.repository.findOneOrFail({ id, i18n });

    const bookWithSpecifiedI18n = this.retrieveSingleTranslation(book, i18n);

    return bookWithSpecifiedI18n;
  }

  public async update(id: string, i18n: I18nEnum, dto: UpdateBookDto) {
    try {
      const { articul } = dto;

      const book = await this.repository.update(id, { articul });
      const translations = await this.repository.updateI18n(id, i18n, dto);

      const result = {
        ...book.toJSON(),
        translations,
      };

      return result;
    } catch (error) {
      throw new RpcException(error.message ?? 'Unknown exception');
    }
  }

  public async addI18n(id: string, dto: AddI18nDto) {
    try {
      const book = await this.repository.findOneOrFail({ id });

      const bookI18nCandidate = book.translations.find(
        (translation) => translation.i18n === dto.i18n,
      );

      if (bookI18nCandidate) {
        throw new RpcException('This localization already added');
      }

      const translations = await this.repository.addI18n({
        bookId: id,
        ...dto,
      });

      const result = {
        ...book.toJSON(),
        translations,
      };

      return result;
    } catch (error) {
      throw new RpcException(error.message ?? 'Unknown exception');
    }
  }

  public async destroy(id: string) {
    const book = await this.repository.delete(id);
    return book;
  }

  private retrieveSingleTranslation(book: Book, i18n: I18nEnum) {
    let translation: BookI18n | any = {};
    let parameters = [];

    // Search the translation matching requested localization
    translation = book.translations.find(
      (translation) => translation.i18n === i18n,
    );

    // If not translation found attempt to search one with english localization
    if (!translation) {
      translation = book.translations.find(
        (translation) => translation.i18n === I18nEnum.EN,
      );
    }

    // If even english localization fails then apply the first translation in the list or null
    if (!translation) {
      translation = book.translations[0] ?? null;
    }

    parameters = book.parameters.filter(
      (param) => param.i18n === translation.i18n,
    );

    return { ...book.toJSON(), translations: translation, parameters };
  }
}
