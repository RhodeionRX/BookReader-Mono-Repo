import { HttpException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { RegisterDto } from './models/dto/register.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/account.model';
import { AccountResponse } from 'src/account/models/response/account.response';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './models/response/token.response';
import { RpcException } from '@nestjs/microservices';
import { Sequelize } from 'sequelize-typescript';
import { AuthorizeDto } from './models/dto/authorize.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private sequelize: Sequelize,
  ) {}

  public async register(dto: RegisterDto): Promise<TokenResponse> {
    try {
      const accountCandidates = await this.accountService.getAll({
        email: dto.email,
      });

      if (accountCandidates.accounts.length > 0) {
        throw new RpcException(
          'Account with specified creditials already exists',
        );
      }

      return await this.sequelize.transaction(async (transaction) => {
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const account = await this.accountService.create(
          {
            email: dto.email,
            password: hashPassword,
          },
          transaction,
        );

        if (!account) throw new RpcException('Account was not created');

        const user = await this.userService.create(
          {
            name: dto.name,
            nickname: dto.nickname,
            surname: dto.surname,
            accountId: account.id,
          },
          transaction,
        );

        if (!user) throw new RpcException('User was not created');

        const token = await this.generateJwt(account);

        return new TokenResponse(token);
      });
    } catch (err) {
      throw new RpcException(err.message || 'Registration failed');
    }
  }

  public async authorize(dto: AuthorizeDto): Promise<TokenResponse> {
    try {
      const { login, email, password } = dto;

      if (!login && !email) {
        throw new RpcException('No login or email is provided in the request');
      }

      const account = await this.accountService.getOne(dto);
      if (!account) {
        throw new RpcException('Wrong login or password');
      }

      const isCorrectPassword = bcrypt.compareSync(password, account.password);

      if (!isCorrectPassword) {
        throw new RpcException('Wrong login or password');
      }
      const token = await this.generateJwt(account);

      return new TokenResponse(token);
    } catch (err) {
      throw new RpcException(err.message || 'Authorization failed');
    }
  }

  private async generateJwt(account: Account | AccountResponse) {
    const secret = this.configService.get<string>('SECRET');
    const payload = {
      id: account.id,
      login: account.login,
      email: account.email,
      emailConfirmed: account.emailConfirmed,
    };

    return this.jwtService.signAsync(payload, { secret });
  }
}
