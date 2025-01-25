import { I18nEnum } from 'enums/i18n.enum';
import { Book } from 'src/book/book.model';
import { BookI18n } from 'src/book_i18n/book_i18n.model';

export class BookResponse {
  id: string;
  title: string;
  description?: string;
  creatorAccountId: string;
  articul?: string;
  i18n: I18nEnum;
  createdAt: Date;
  updatedAt: Date;

  constructor(book: Book, translation?: BookI18n[] | BookI18n) {
    this.id = book.id;
    this.articul = book.articul ?? undefined;

    if (Array.isArray(translation)) {
      this.title = translation[0].title;
      this.description = translation[0].description ?? undefined;
      this.i18n = translation[0].i18n;
    } else if (translation) {
      this.title = translation.title;
      this.description = translation.description ?? undefined;
      this.i18n = translation.i18n;
    }
    this.creatorAccountId = book.creator_account_id;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }
}
