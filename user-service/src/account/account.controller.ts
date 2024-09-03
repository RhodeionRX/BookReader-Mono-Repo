import { Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post()
  public create(): any {}
}
