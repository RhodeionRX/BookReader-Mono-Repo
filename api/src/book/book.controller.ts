import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  Version,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { I18nEnum } from 'enums/I18n.enum';
import {
  AddI18nRequest,
  GetAllBooksRequest,
  InitBookRequest,
  UpdateBookRequest,
} from './models/request';
import { AllBooksResponse, BookResponse } from './models/response';
import { Book } from './models/entity';
import { GetAllBooksResponse } from './models/interfaces';
import { ServiceHandler } from 'src/services/service-handler';
import { instanceToPlain } from 'class-transformer';

@Controller('book')
export class BookController {
  private serviceHandler: ServiceHandler;

  constructor(
    @Inject('CATALOGUE_SERVICE')
    private readonly catalogueServiceClient: ClientProxy,
  ) {
    this.serviceHandler = new ServiceHandler(catalogueServiceClient);
  }

  // TODO: add cache
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/init')
  public async init(
    @Body() dto: InitBookRequest,
    @User() user: IUser,
  ): Promise<BookResponse> {
    const payload = {
      ...dto,
      userId: user.id,
    };
    const result = await this.serviceHandler.send('init', payload);

    const book = result as Book;

    return new BookResponse(book, book.translations, book.parameters);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(
    @Query() query: GetAllBooksRequest,
  ): Promise<AllBooksResponse> {
    const payload = instanceToPlain(query);
    const result = await this.serviceHandler.send('getAll', payload);

    const books = result as GetAllBooksResponse;

    return new AllBooksResponse(books, query.page, query.size);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(
    @Param('id') id: string,
    @Query('lng') lng: I18nEnum = I18nEnum.EN,
  ): Promise<BookResponse> {
    const payload = { id, i18n: lng };
    const result = await this.serviceHandler.send('getOne', payload);

    const book = result as Book;

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

    const payload = { id, i18n, dto };
    const result = await this.serviceHandler.send('update', payload);

    const book = result as Book;

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
    const payload = { id, dto };
    const result = await this.serviceHandler.send('addI18n', payload);

    const book = result as Book;

    return new BookResponse(book, book.translations);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard)
  public async remove(@Param('id') id: string) {
    const payload = id;
    const result = await this.serviceHandler.send('destroy', payload);

    const book = result as Book;

    return new BookResponse(book);
  }
}
