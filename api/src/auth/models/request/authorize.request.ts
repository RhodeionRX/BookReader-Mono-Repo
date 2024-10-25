import { IsEmail, IsString, Length, MinLength, ValidateIf } from "class-validator";

export class AuthorizeRequest {
    @ValidateIf(req => !req.login)
    @IsString()
    @IsEmail()
    public readonly email?: string;

    @ValidateIf(req => !req.email)
    @Length(3, 20)
    @IsString()
    public readonly login?: string;

    @IsString()
    @MinLength(6)
    public readonly password: string;
}