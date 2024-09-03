import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/account/account.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  surname: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: true,
    unique: true,
  })
  nickname: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  accountId: string;

  @BelongsTo(() => Account)
  account: Account;

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
