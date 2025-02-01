import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { I18nEnum } from 'enums/I18n.enum';

export class InitBookRequest {
  @IsEnum(I18nEnum)
  @IsNotEmpty()
  public readonly i18n: I18nEnum;

  @IsString()
  @Length(3, 100)
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @IsOptional()
  public readonly articul?: string;
}
