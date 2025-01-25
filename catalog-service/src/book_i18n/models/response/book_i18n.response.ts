import { I18nEnum } from 'enums/i18n.enum';
import { BookI18n } from 'src/book_i18n/book_i18n.model';

export class BookI18nResponse {
  i18n: I18nEnum;
  bookId: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(book_i18n: BookI18n) {
    this.i18n = book_i18n.i18n;
    this.bookId = book_i18n.bookId;
    this.title = book_i18n.title;
    this.description = book_i18n.description ?? undefined;
    this.createdAt = book_i18n.createdAt;
    this.updatedAt = book_i18n.updatedAt;
  }
}
