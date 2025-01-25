import { Injectable } from '@nestjs/common';
import { CreateBookI18nDto } from './dto/create-book_i18n.dto';
import { UpdateBookI18nDto } from './dto/update-book_i18n.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookI18n } from './book_i18n.model';
import { I18nEnum } from 'enums/i18n.enum';

@Injectable()
export class BookI18nService {
  constructor(@InjectModel(BookI18n) private repository: typeof BookI18n) {}

  public async create(dto: CreateBookI18nDto) {
    const bookI18n = await this.repository.create(dto);
    return bookI18n;
  }

  public async getOne(bookId: string, i18n: I18nEnum) {
    console.log(bookId, i18n);
    const bookI18n = await this.repository.findOne({
      where: {
        bookId,
        i18n,
      },
    });
    return bookI18n;
  }

  public async update(
    bookId: string,
    i18n: I18nEnum,
    updateBookI18nDto: UpdateBookI18nDto,
  ) {
    const bookI18n = await this.getOne(bookId, i18n);

    bookI18n.update(updateBookI18nDto);

    bookI18n.save();

    return bookI18n;
  }

  remove(id: number) {
    return `This action removes a #${id} bookI18n`;
  }
}
