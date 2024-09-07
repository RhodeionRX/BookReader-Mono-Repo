import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './models/dto/create-user-dto';
import { UserResponse } from './models/response/user.response';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private repository: typeof User) {}

  public async create(dto: CreateUserDto, transaction?: Transaction) {
    const user = await this.repository.create(
      dto,
      transaction && { transaction },
    );
    return new UserResponse(user);
  }
}
