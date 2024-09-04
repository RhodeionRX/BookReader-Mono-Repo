import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { RegisterRequest } from './models/request/register.request';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/account.model';
import { AccountResponse } from 'src/account/models/response/account.response';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './models/response/token.response';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async register(dto: RegisterRequest) {
    console.log(dto);
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const account = await this.accountService.create({
      email: dto.email,
      password: hashPassword,
    });

    if (!account)
      throw new HttpException('Account was not created', HttpStatus.NOT_FOUND);

    const user = await this.userService.create({
      name: dto.name,
      nickname: dto.nickname,
      surname: dto.surname,
      accountId: account.id,
    });

    if (!user)
      throw new HttpException('User was not created', HttpStatus.NOT_FOUND);

    const token = await this.generateJwt(account);

    return new TokenResponse(token);
  }

  private async generateJwt(account: Account | AccountResponse) {
    const payload = {
      id: account.id,
      login: account.login,
      email: account.email,
      emailConfirmed: account.emailConfirmed,
    };

    return this.jwtService.signAsync(payload);
  }
}
