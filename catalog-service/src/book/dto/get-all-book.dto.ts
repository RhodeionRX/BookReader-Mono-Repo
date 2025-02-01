import { I18nEnum } from 'enums/i18n.enum';

export class GetAllBooksDto {
  creator_account_id?: string;
  title?: string;
  i18n?: I18nEnum;
  articul?: string;
  size?: number = 10;
  page?: number = 1;
}
