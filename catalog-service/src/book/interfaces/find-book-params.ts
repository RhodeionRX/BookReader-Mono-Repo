import { I18nEnum } from 'enums/i18n.enum';

export interface IFindOneBookParams {
  id?: string;
  creator_account_id?: string;
  articul?: string;
  createdAt?: Date;
  // i18n?: I18nEnum;
}
