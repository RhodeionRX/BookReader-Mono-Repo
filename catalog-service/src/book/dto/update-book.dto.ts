import { I18nEnum } from 'enums/i18n.enum';

export class UpdateBookDto {
  public readonly title?: string;
  public readonly description?: string;
  public readonly articul?: string;
  [key: string]: string;
}
