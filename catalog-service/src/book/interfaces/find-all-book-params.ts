import { I18nEnum } from 'enums/i18n.enum';

export interface IFindBooksParams {
  creator_account_id?: string;
  title?: string;
  articul?: string;
  size?: number;
  page?: number;
  i18n: I18nEnum;
}
