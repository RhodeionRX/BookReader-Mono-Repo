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
} from '@nestjs/common';
import { InitBookRequest } from './models/requests/init-book.request';
import { UpdateBookDto } from './models/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/entities/user.entity';

@Controller('book')
export class BookController {
  constructor(
    @Inject('CATALOGUE_SERVICE')
    private readonly catalogueServiceClient: ClientProxy,
  ) {}

  // TODO: add guard
  // TODO: add cache
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/init')
  public async init(
    @Body() initBookRequest: InitBookRequest,
    @User() user: IUser,
  ): Promise<Observable<any>> {
    return this.catalogueServiceClient
      .send('init', { ...initBookRequest, userId: user.id })
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  message: error.message || 'Book creation error',
                },
                HttpStatus.BAD_REQUEST,
              ),
          );
        }),
      );
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
