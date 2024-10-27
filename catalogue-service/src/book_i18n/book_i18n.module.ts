import { Module } from '@nestjs/common';
import { BookI18nService } from './book_i18n.service';
import { BookI18nController } from './book_i18n.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookI18n } from './entities/book_i18n.entity';

@Module({
  imports: [SequelizeModule.forFeature([BookI18n])],
  controllers: [BookI18nController],
  providers: [BookI18nService],
})
export class BookI18nModule {}
