import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'books',
  timestamps: true,
})
export class Book extends Model<Book> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  articul: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: true,
  })
  creator_account_id: string;
}
