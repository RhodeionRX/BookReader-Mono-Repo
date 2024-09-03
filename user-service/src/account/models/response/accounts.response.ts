import { AccountResponse } from './account.response';

export class AccountsResponse {
  accounts: AccountResponse[];

  constructor(accounts: AccountResponse[]) {
    this.accounts = accounts;
  }
}
