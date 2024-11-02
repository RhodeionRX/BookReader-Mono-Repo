import { I18nEnum } from 'enums/i18n.enum';

export class InitBookDto {
  public readonly userId: string;
  public readonly i18n: I18nEnum;
  public readonly title: string;
  public readonly description?: string;
  public readonly articul?: string;
}
