import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { I18nEnum } from 'enums/I18n.enum';

export class GetAllBooksRequest {
  @IsUUID()
  @IsOptional()
  creator_account_id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(I18nEnum)
  @IsOptional()
  i18n?: I18nEnum;

  @IsString()
  @IsOptional()
  articul?: string;
}
