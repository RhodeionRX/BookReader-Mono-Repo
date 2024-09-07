import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString()
  @Length(3, 20)
  public readonly name: string;

  @IsString()
  @Length(3, 20)
  @IsOptional()
  public readonly surname?: string;

  @IsString()
  @Length(3, 20)
  @IsOptional()
  public readonly nickname?: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(6)
  public readonly password: string;
}
