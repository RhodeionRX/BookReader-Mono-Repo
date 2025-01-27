import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  size?: number = 10;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;
}
