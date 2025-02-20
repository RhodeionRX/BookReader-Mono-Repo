import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  ValidatorConstraint,
} from 'class-validator';
import { I18nEnum } from 'enums/I18n.enum';
import { AddParameterRequest } from './add-parameter.request';
import { Type } from 'class-transformer';

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddParameterRequest)
  public readonly parameters?: AddParameterRequest[];
}
