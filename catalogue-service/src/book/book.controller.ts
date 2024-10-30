import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { InitBookDto } from './dto/init-book.dto';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @MessagePattern('init')
  public async init(initBookDto: InitBookDto): Promise<any> {
    return initBookDto;
  }
}
