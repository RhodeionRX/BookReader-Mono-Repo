import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasOne,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({
  tableName: 'accounts',
  timestamps: true,
})
export class Account extends Model<Account> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailConfirmed: boolean;

  @HasOne(() => User)
  user: User;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
