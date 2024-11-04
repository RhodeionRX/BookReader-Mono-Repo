import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';
import { BookResponse } from './models/response/book.response';
import { GetAllBooksDto } from './dto/get-all-book.dto';
import { AllBooksResponse } from './models/response/all-book.response';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

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
  public async getOne(id: string): Promise<BookResponse> {
    const response = await this.service.getOne(id);
    return new BookResponse(response);
  }
}
