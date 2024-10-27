import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @MessagePattern('init')
  public async init(initDto: any): Promise<any> {
    return 'TEST';
  }
}
