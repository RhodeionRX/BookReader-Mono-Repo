import { Injectable } from '@nestjs/common';
import { CreateBookI18nDto } from './dto/create-book_i18n.dto';
import { UpdateBookI18nDto } from './dto/update-book_i18n.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookI18n } from './book_i18n.model';

@Injectable()
export class BookI18nService {
  constructor(@InjectModel(BookI18n) private repository: typeof BookI18n) {}

  public async create(dto: CreateBookI18nDto) {
    const bookI18n = await this.repository.create(dto);
    return bookI18n;
  }

  findAll() {
    return `This action returns all bookI18n`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookI18n`;
  }

  update(id: number, updateBookI18nDto: UpdateBookI18nDto) {
    return `This action updates a #${id} bookI18n`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookI18n`;
  }
}
