import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';
import { BookResponse } from './models/response/book.response';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @MessagePattern('init')
  public async init(initBookDto: InitBookDto): Promise<BookResponse> {
    const response = await this.service.create(initBookDto);
    return new BookResponse(response.book, response.translations);
  }
}
