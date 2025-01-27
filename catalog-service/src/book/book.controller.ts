import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
import { BookI18nService } from 'src/book_i18n/book_i18n.service';
import { AddI18nDto } from './dto/add-i18n.dto';

@Controller('book')
export class BookController {
  constructor(
    private service: BookService,
    private serviceI18n: BookI18nService,
  ) {}

  @MessagePattern('init')
  public async init(initBookDto: InitBookDto) {
    const response = await this.service.create(initBookDto);
    return { book: response.book, translations: response.translations };
  }

  @MessagePattern('getAll')
  public async getAll(dto: GetAllBooksDto) {
    const response = await this.service.getAll(dto);

    return { books: response };
  }

  @MessagePattern('getOne')
  public async getOne({
    id,
    i18n = I18nEnum.ENGLISH,
  }: {
    id: string;
    i18n: I18nEnum;
  }) {
    const book = await this.service.getOne(id, i18n);
    return { book };
  }

  @MessagePattern('update')
  public async update({
    id,
    i18n,
    dto,
  }: {
    id: string;
    i18n: I18nEnum;
    dto: UpdateBookDto;
  }) {
    const response = await this.service.update(id, i18n, dto);
    return { book: response.book, translation: response.bookI18n };
  }

  @MessagePattern('destroy')
  public async destroy(id: string) {
    const response = await this.service.destroy(id);
    return { book: response };
  }

  @MessagePattern('addI18n')
  public async addI18n({ id, dto }: { id: string; dto: AddI18nDto }) {
    const response = await this.service.addI18n(id, dto);

    return response;
  }
}
