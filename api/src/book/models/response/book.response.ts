import { I18nEnum } from 'enums/I18n.enum';
import { Book, BookParameter, BookTranslation } from '../entity';

export class BookResponse {
  id: string;
  title: string;
  description?: string;
  creatorAccountId: string;
  articul?: string;
  i18n: I18nEnum;
  parameters?: Pick<BookParameter, 'label' | 'value'>[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    book: Book,
    translations?: BookTranslation[] | BookTranslation,
    parameters?: BookParameter[],
  ) {
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

    if (parameters) {
      this.parameters = parameters.map(({ label, value }) => ({
        label,
        value,
      }));
    }

    this.creatorAccountId = book.creator_account_id;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }
}
