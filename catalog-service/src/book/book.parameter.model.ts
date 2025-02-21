import { I18nEnum } from 'enums/i18n.enum';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Book } from './book.model';

@Table({
  tableName: 'book_parameters',
  timestamps: true,
})
export class BookParameter extends Model<BookParameter> {
  @PrimaryKey
  @Column({
    type: DataType.ENUM(...(Object.values(I18nEnum) as string[])),
    allowNull: false,
  })
  i18n: I18nEnum;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  label: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ForeignKey(() => Book)
  bookId: string;

  @BelongsTo(() => Book)
  book: Book;

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
