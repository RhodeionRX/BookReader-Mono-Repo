import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Version,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { I18nEnum } from 'enums/I18n.enum';
import {
  AddI18nRequest,
  GetAllBooksRequest,
  InitBookRequest,
  UpdateBookRequest,
} from './models/request';
import { AllBooksResponse, BookResponse } from './models/response';
import { User } from 'src/users/users.model';
import { AuthUser } from 'src/users/user.decorator';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}


  // TODO: add cache
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/init')
  public async init(
    @Body() request: InitBookRequest,
    @AuthUser() user: User,
  ): Promise<BookResponse> {
    const dto = {
      ...request,
      userId: user.id,
    };

    const {book, translations, parameters} = await this.service.create(dto);

    return new BookResponse(book, translations, parameters);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(
    @Query() query: GetAllBooksRequest,
  ): Promise<AllBooksResponse> {
    const books = await this.service.getAll(query);
    return new AllBooksResponse(books, query.page, query.size);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(
    @Param('id') id: string,
    @Query('lng') lng: I18nEnum = I18nEnum.EN,
  ): Promise<BookResponse> {
    const book = await this.service.getOne(id, lng);
    return new BookResponse(book, book.translations, book.parameters);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Patch('/:id/:i18n')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id') id: string,
    @Param('i18n') i18n: I18nEnum,
    @Body() dto: UpdateBookRequest,
  ): Promise<BookResponse> {
    if (!(i18n in I18nEnum)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: `Invalid i18n value: ${i18n}. Must be one of: ${Object.values(I18nEnum).join(', ')}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.service.update(id, i18n, dto);

    return new BookResponse(book, book.translations);
  }

  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  @UseGuards(AuthGuard)
  public async addI18n(
    @Param('id') id: string,
    @Body() dto: AddI18nRequest,
  ): Promise<BookResponse> {
    const book = await this.service.addI18n(id, dto);

    return new BookResponse(book, book.translations);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard)
  public async remove(@Param('id') id: string) {
    const book = await this.service.destroy(id);
    return new BookResponse(book);
  }
}
