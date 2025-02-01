import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BookI18n } from 'src/book/book.i18n.model';
import { BookParameter } from './book-parameter.model';

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

  @HasMany(() => BookI18n)
  translations: BookI18n[];

  @HasMany(() => BookParameter)
  parameters: BookParameter[];

  @Column({
    type: DataType.UUIDV4,
    allowNull: true,
  })
  creator_account_id: string;

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
    onUpdate: 'NOW',
  })
  updatedAt: Date;
}
