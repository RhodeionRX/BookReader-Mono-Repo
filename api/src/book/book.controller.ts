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
import { UpdateBookDto } from './models/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/entities/user.entity';
import { GetAllBooksRequest } from './models/requests/get-all-books.request';
import { AuthGuard } from 'src/auth/auth.guard';
import { handleMicroserviceException } from 'src/utils';

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
  public async findOne(@Param('id') id: string) {
    return this.catalogueServiceClient
      .send('getOne', id)
      .pipe(catchError(handleMicroserviceException));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {}

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.catalogueServiceClient
      .send('destroy', id)
      .pipe(catchError(handleMicroserviceException));
  }
}
