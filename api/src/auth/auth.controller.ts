import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Version,
} from '@nestjs/common';
import { RegisterRequest } from './models/request/register.request';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  public async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<Observable<any>> {
    return this.userServiceClient.send({ cmd: 'register' }, registerRequest);
  }
}
