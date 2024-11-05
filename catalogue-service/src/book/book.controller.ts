import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';
import { BookResponse } from './models/response/book.response';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { AllBooksResponse } from './models/response/all-book.response';
import { UpdateBookDto } from './dto/update-book.dto';
import { I18nEnum } from 'enums/i18n.enum';
import { BookI18nService } from 'src/book_i18n/book_i18n.service';

@Controller('book')
export class BookController {
  constructor(
    private service: BookService,
    private serviceI18n: BookI18nService,
  ) {}

  @MessagePattern('init')
  public async init(initBookDto: InitBookDto): Promise<BookResponse> {
    const response = await this.service.create(initBookDto);
    return new BookResponse(response.book, response.translations);
  }

  @MessagePattern('getAll')
  public async getAll(dto: GetAllBooksDto): Promise<AllBooksResponse> {
    const response = await this.service.getAll(dto);
    return new AllBooksResponse(response);
  }

  @MessagePattern('getOne')
  public async getOne({
    id,
    i18n = I18nEnum.ENGLISH,
  }: {
    id: string;
    i18n: I18nEnum;
  }): Promise<BookResponse> {
    const book = await this.service.getOne(id);
    const bookI18n = await this.serviceI18n.getOne(id, i18n);
    return new BookResponse(book, [bookI18n]);
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
  }): Promise<any> {
    const updatedBook = await this.service.update(id, i18n, dto);
    return new BookResponse(updatedBook.book, updatedBook.bookI18n);
  }

  @MessagePattern('destroy')
  public async destroy(id: string): Promise<BookResponse> {
    const response = await this.service.destroy(id);
    return new BookResponse(response);
  }
}
