import { I18nEnum } from 'enums/i18n.enum';

export class CreateBookI18nDto {
  public readonly bookId: string;
  public readonly i18n: I18nEnum;
  public readonly title: string;
  public readonly description?: string;
}
