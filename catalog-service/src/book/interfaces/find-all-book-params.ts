import { I18nEnum } from 'enums/i18n.enum';

export interface IFindBooksParams {
  creator_account_id?: string;
  title?: string;
  // i18n?: I18nEnum;
  articul?: string;
  size?: number;
  page?: number;
}
