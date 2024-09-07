import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { RegisterDto } from './models/request/register.request';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/account.model';
import { AccountResponse } from 'src/account/models/response/account.response';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './models/response/token.response';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async register(dto: RegisterDto) {
    const accountCandidates = await this.accountService.getAll({
      email: dto.email,
    });

    if (accountCandidates.accounts.length > 0) {
      throw new RpcException(
        'Account with specified creditials already exists',
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const account = await this.accountService.create({
      email: dto.email,
      password: hashPassword,
    });

    if (!account) throw new RpcException('Account was not created');

    const user = await this.userService.create({
      name: dto.name,
      nickname: dto.nickname,
      surname: dto.surname,
      accountId: account.id,
    });

    if (!user) throw new RpcException('User was not created');

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
