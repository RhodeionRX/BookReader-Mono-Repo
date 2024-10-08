import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './models/dto/create-account.dto';
import { AccountSearchParams } from './models/dto/account-search-params.dto';
import { Account } from './account.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AccountResponse } from './models/response/account.response';
import { AccountsResponse } from './models/response/accounts.response';
import { Transaction } from 'sequelize';

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

  public async getAll(params: AccountSearchParams) {
    const whereClause: any = {};

    if (params.email) whereClause.email = params.email;

    if (params.login) whereClause.login = params.login;

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
}
