import { Account } from 'src/account/account.model';
import { UserResponse } from 'src/users/models/response/user.response';
import { User } from 'src/users/user.model';

export class AccountResponse {
  id: string;
  login: string;
  email: string;
  emailConfirmed: boolean;
  user?: User | UserResponse;
  createdAt: Date;
  updatedAt: Date;

  constructor(account: Account, user?: User) {
    this.id = account.id;
    this.login = account.login;
    this.email = account.email;
    this.emailConfirmed = account.emailConfirmed;
    this.user = user
      ? new UserResponse(user)
      : account.user
        ? new UserResponse(account.user)
        : undefined;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
}
