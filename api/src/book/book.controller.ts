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
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { handleMicroserviceException } from 'src/utils';
import { I18nEnum } from 'enums/I18n.enum';
import {
  AddI18nRequest,
  GetAllBooksRequest,
  InitBookRequest,
  UpdateBookRequest,
} from './models/requests';

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
    @Body() dto: InitBookRequest,
    @User() user: IUser,
  ): Promise<Observable<any>> {
    return this.catalogueServiceClient
      .send('init', { ...dto, userId: user.id })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(
    @Query() query: GetAllBooksRequest,
  ): Promise<Observable<any>> {
    return this.catalogueServiceClient
      .send('getAll', query)
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(
    @Param('id') id: string,
    @Query('lng') lng: I18nEnum = I18nEnum.ENGLISH,
  ) {
    return this.catalogueServiceClient
      .send('getOne', { id, i18n: lng })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Patch('/:id/:i18n')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id') id: string,
    @Param('i18n') i18n: I18nEnum,
    @Body() dto: UpdateBookRequest,
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
      .send('update', { id, i18n, dto })
      .pipe(catchError(handleMicroserviceException));
  }

  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  @UseGuards(AuthGuard)
  public async addI18n(@Param('id') id: string, @Body() dto: AddI18nRequest) {
    const result = await this.catalogueServiceClient
      .send('addI18n', { id, dto })
      .pipe(catchError(handleMicroserviceException));

    return result;
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard)
  public async remove(@Param('id') id: string) {
    return this.catalogueServiceClient
      .send('destroy', id)
      .pipe(catchError(handleMicroserviceException));
  }
}
