import { I18nEnum } from "enums/I18n.enum";

export interface IFindOneBookParams {
  id?: string;
  creatorAccountId?: string;
  articul?: string;
  createdAt?: Date;
  i18n?: I18nEnum;
}
