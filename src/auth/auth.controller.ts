import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { TokenResponse } from './models/response/token.response';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/dto/register.dto';
import { AuthorizeDto } from './models/dto/authorize.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<TokenResponse> {
    console.warn(registerDto);
    return await this.service.register(registerDto);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  public async authorize(
    @Body() authorizeDto: AuthorizeDto,
  ): Promise<TokenResponse> {
    return await this.service.authorize(authorizeDto);
  }
}
