import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { I18nEnum } from 'enums/I18n.enum';

export class AddParameterRequest {
  @IsEnum(I18nEnum)
  @IsOptional()
  public readonly i18n?: I18nEnum = I18nEnum.EN;

  @IsString()
  @Length(1, 50)
  public readonly label: string;

  @IsString()
  @Length(1, 50)
  public readonly value: string;
}
