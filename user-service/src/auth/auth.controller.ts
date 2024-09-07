import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/request/register.request';
import { TokenResponse } from './models/response/token.response';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @MessagePattern('register')
  public async register(registerDto: RegisterDto): Promise<TokenResponse> {
    return await this.service.register(registerDto);
  }
}
