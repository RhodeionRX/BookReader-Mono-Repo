import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
import { AddI18nDto } from './dto/add-i18n.dto';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @MessagePattern('init')
  public async init(dto: InitBookDto) {
    const book = await this.service.create(dto);
    return book;
  }

  @MessagePattern('getAll')
  public async getAll(dto: GetAllBooksDto) {
    const response = await this.service.getAll(dto);
    return response;
  }

  @MessagePattern('getOne')
  public async getOne({
    id,
    i18n = I18nEnum.EN,
  }: {
    id: string;
    i18n: I18nEnum;
  }) {
    const response = await this.service.getOne(id, i18n);
    return response;
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
    return response;
  }

  @MessagePattern('destroy')
  public async destroy(id: string) {
    const response = await this.service.destroy(id);
    return response;
  }

  @MessagePattern('addI18n')
  public async addI18n({ id, dto }: { id: string; dto: AddI18nDto }) {
    const response = await this.service.addI18n(id, dto);
    return response;
  }
}
