import { I18nEnum } from 'enums/I18n.enum';
import { BookI18n } from 'src/book/book.i18n.model';
import { BookParameter } from 'src/book/book.parameter.model';

export class BookResponse {
  id: string;
  title: string;
  description?: string;
  creatorUserId: string;
  articul?: string;
  i18n: I18nEnum;
  parameters?: Pick<BookParameter, 'label' | 'value'>[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    book: any, // TODO: make type with filled Book
    translations?: BookI18n[] | BookI18n,
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

    if (parameters.length > 0) {
      this.parameters = parameters.map(({ label, value }) => ({
        label,
        value,
      }));
    }

    this.creatorUserId = book.creatorUserId;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }
}
