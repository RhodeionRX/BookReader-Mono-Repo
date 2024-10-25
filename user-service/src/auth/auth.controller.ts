import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/dto/register.dto';
import { TokenResponse } from './models/response/token.response';
import { MessagePattern } from '@nestjs/microservices';
import { AuthorizeDto } from './models/dto/authorize.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @MessagePattern('register')
  public async register(registerDto: RegisterDto): Promise<TokenResponse> {
    return await this.service.register(registerDto);
  }

  @MessagePattern('authorize')
  public async authorize(authorizeDto: AuthorizeDto): Promise<TokenResponse> {
    return await this.service.authorize(authorizeDto);
  }
}
