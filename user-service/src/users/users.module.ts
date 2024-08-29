import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Account } from 'src/account/account.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Account])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
