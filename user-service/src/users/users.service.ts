import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './models/dto/create-user-dto';
import { UserResponse } from './models/response/user.response';
import { Transaction } from 'sequelize';
import { GetUserDto } from './models/dto/get-user-dto';

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

  public async getOne(dto: GetUserDto) {
    const selection = {}

    const user = await this.repository.findOne(selection)

    return user;
  }
}
