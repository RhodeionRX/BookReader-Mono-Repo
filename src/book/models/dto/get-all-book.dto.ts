import { I18nEnum } from 'enums/I18n.enum';

export class GetAllBooksDto {
  creatorUserId?: string;
  title?: string;
  i18n?: I18nEnum;
  articul?: string;
  size?: number = 10;
  page?: number = 1;
}
