import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBookRequest {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  public readonly title?: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @IsOptional()
  public readonly articul?: string;
}
