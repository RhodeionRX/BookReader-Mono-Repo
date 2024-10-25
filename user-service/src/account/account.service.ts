import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './models/dto/create-account.dto';
import { AccountSearchParams } from './models/dto/account-search-params.dto';
import { Account } from './account.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AccountResponse } from './models/response/account.response';
import { AccountsResponse } from './models/response/accounts.response';
import { Transaction } from 'sequelize';
import { GetAccountDto } from './models/dto/get-account-dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account) private repository: typeof Account) {}

  public async create(dto: CreateAccountDto, transaction?: Transaction) {
    const account = await this.repository.create(
      { ...dto, login: dto.email },
      transaction && { transaction },
    );
    return account;
  }

  public async getAll(query: AccountSearchParams) {
    const whereClause: any = {};

    if (query.email) whereClause.email = query.email;

    if (query.login) whereClause.login = query.login;

    const accounts = await this.repository.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return new AccountsResponse(accounts);
  }

  public async getOne(query: GetAccountDto) {
    const whereClause: any = {};

    if (query.id) whereClause.id = query.id;

    if (query.email) whereClause.email = query.email;

    if (query.login) whereClause.login = query.login

    const account = await this.repository.findOne({
      where: whereClause,
      include: [
        {
          model: User, 
          as: 'user'
        }
      ]
    });

    return account;
  }
}
