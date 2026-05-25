import { I18nEnum } from "enums/I18n.enum";

export class AddI18nDto {
  i18n: I18nEnum;
  title: string;
  description?: string;
  articul?: string;
}
