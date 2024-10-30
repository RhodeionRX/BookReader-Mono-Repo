import { I18nEnum } from 'enums/i18n.enum';
import { Model } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.model';

@Table({
  tableName: 'book_i18n',
  timestamps: true,
})
export class BookI18n extends Model<BookI18n> {
  @PrimaryKey
  @Column({
    type: DataType.ENUM(...(Object.values(I18nEnum) as string[])),
    allowNull: false,
  })
  i18n: I18nEnum;

  @PrimaryKey
  @ForeignKey(() => Book)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  bookId: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

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
