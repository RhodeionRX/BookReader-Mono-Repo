import { Injectable } from '@nestjs/common';
import { CreateBookI18nDto } from './dto/create-book_i18n.dto';
import { UpdateBookI18nDto } from './dto/update-book_i18n.dto';

@Injectable()
export class BookI18nService {
  create(createBookI18nDto: CreateBookI18nDto) {
    return 'This action adds a new bookI18n';
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
