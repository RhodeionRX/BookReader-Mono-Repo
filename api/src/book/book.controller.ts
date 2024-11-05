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
import { InitBookRequest } from './models/requests/init-book.request';
import { UpdateBookRequest } from './models/requests/update-book.request';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/entities/user.entity';
import { GetAllBooksRequest } from './models/requests/get-all-books.request';
import { AuthGuard } from 'src/auth/auth.guard';
import { handleMicroserviceException } from 'src/utils';
import { I18nEnum } from 'enums/I18n.enum';

@Controller('book')
export class BookController {
  constructor(
    @Inject('CATALOGUE_SERVICE')
    private readonly catalogueServiceClient: ClientProxy,
  ) {}

  // TODO: add cache
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/init')
  public async init(
    @Body() initBookRequest: InitBookRequest,
    @User() user: IUser,
  ): Promise<Observable<any>> {
    return this.catalogueServiceClient
      .send('init', { ...initBookRequest, userId: user.id })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(
    @Query() request: GetAllBooksRequest,
  ): Promise<Observable<any>> {
    return this.catalogueServiceClient
      .send('getAll', request)
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(@Param('id') id: string, @Query('lng') lng?: I18nEnum) {
    return this.catalogueServiceClient
      .send('getOne', { id, i18n: lng ?? I18nEnum.ENGLISH })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Patch(':id/:i18n')
  public async update(
    @Param('id') id: string,
    @Param('i18n') i18n: I18nEnum,
    @Body() updateBookDto: UpdateBookRequest,
  ) {
    if (!(i18n in I18nEnum)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: `Invalid i18n value: ${i18n}. Must be one of: ${Object.values(I18nEnum).join(', ')}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.catalogueServiceClient
      .send('update', { id, i18n, dto: updateBookDto })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.catalogueServiceClient
      .send('destroy', id)
      .pipe(catchError(handleMicroserviceException));
  }
}
