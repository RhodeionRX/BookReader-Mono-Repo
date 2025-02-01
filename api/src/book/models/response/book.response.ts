import { I18nEnum } from 'enums/I18n.enum';
import { Book, BookTranslation } from '../entity';

export class BookResponse {
  id: string;
  title: string;
  description?: string;
  creatorAccountId: string;
  articul?: string;
  i18n: I18nEnum;
  createdAt: Date;
  updatedAt: Date;

  constructor(book: Book, translations?: BookTranslation[] | BookTranslation) {
    this.id = book.id;
    this.articul = book.articul ?? undefined;

    if (Array.isArray(translations)) {
      this.title = translations[0].title;
      this.description = translations[0].description ?? undefined;
      this.i18n = translations[0].i18n;
    } else if (translations) {
      this.title = translations.title;
      this.description = translations.description ?? undefined;
      this.i18n = translations.i18n;
    }
    this.creatorAccountId = book.creator_account_id;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }
}
