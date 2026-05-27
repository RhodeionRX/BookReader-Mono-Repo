import { I18nEnum } from "enums/I18n.enum";

export interface IFindBooksParams {
  creatorUserId?: string;
  title?: string;
  articul?: string;
  size?: number;
  page?: number;
  i18n: I18nEnum;
}
