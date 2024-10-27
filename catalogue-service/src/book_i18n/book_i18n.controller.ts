import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookI18nService } from './book_i18n.service';
import { CreateBookI18nDto } from './dto/create-book_i18n.dto';
import { UpdateBookI18nDto } from './dto/update-book_i18n.dto';

@Controller('book-i18n')
export class BookI18nController {
  constructor(private readonly bookI18nService: BookI18nService) {}

  @Post()
  create(@Body() createBookI18nDto: CreateBookI18nDto) {
    return this.bookI18nService.create(createBookI18nDto);
  }

  @Get()
  findAll() {
    return this.bookI18nService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookI18nService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookI18nDto: UpdateBookI18nDto) {
    return this.bookI18nService.update(+id, updateBookI18nDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookI18nService.remove(+id);
  }
}
