import { I18nEnum } from 'enums/I18n.enum';

export class BookTranslation {
  public readonly i18n: I18nEnum;
  public readonly bookId: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    i18n: I18nEnum,
    bookId: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
  ) {
    this.i18n = i18n;
    this.bookId = bookId;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
  }
}
