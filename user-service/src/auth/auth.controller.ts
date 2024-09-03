import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './models/request/register.request';
import { TokenResponse } from './models/response/token.response';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Body() registerDto: RegisterRequest,
  ): Promise<TokenResponse> {
    return await this.service.register(registerDto);
  }
}
