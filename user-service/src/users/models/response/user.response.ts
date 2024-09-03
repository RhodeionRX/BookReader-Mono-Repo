import { User } from 'src/users/user.model';

export class UserResponse {
  id: string;
  name: string;
  surname?: string;
  nickname?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.nickname = user.nickname;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
