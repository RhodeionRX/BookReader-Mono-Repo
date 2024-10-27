import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
