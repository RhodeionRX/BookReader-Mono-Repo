import { I18nEnum } from 'enums/I18n.enum';

export class BookParameter {
  public readonly i18n: I18nEnum;
  public readonly bookId: string;
  public readonly label: string;
  public readonly value: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    i18n: I18nEnum,
    bookId: string,
    label: string,
    value: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.i18n = i18n;
    this.bookId = bookId;
    this.label = label;
    this.value = value;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
