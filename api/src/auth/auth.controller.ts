import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Version,
} from '@nestjs/common';
import { RegisterRequest } from './models/request/register.request';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthorizeRequest } from './models/request/authorize.request';

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
    return this.userServiceClient.send('register', registerRequest).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                message: error.message || 'Registration failed',
              },
              HttpStatus.BAD_REQUEST,
            ),
        );
      }),
    );
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  public async authorize(
    @Body() authorizeRequest: AuthorizeRequest
  ): Promise<Observable<any>> {
    return this.userServiceClient.send('authorize', authorizeRequest).pipe(
      catchError((error) => {
        return throwError(() => 
          new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              message: error.message || 'Authorization failed',
            },
            HttpStatus.BAD_REQUEST
          ));
      }),
    );
  }
}
