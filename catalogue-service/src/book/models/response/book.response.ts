import { Book } from 'src/book/book.model';
import { BookI18n } from 'src/book_i18n/book_i18n.model';
import { BookI18nResponse } from 'src/book_i18n/models/response/book_i18n.response';

export class BookResponse {
  id: string;
  creatorAccountId: string;
  articul?: string;
  createdAt: Date;
  updatedAt: Date;
  translations: BookI18nResponse[];

  constructor(book: Book, translations?: BookI18n[]) {
    this.id = book.id;
    this.creatorAccountId = book.creator_account_id;
    this.articul = book.articul ?? undefined;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;

    this.translations = (translations || book.translations || []).map(
      (translation) => new BookI18nResponse(translation),
    );
  }
}
