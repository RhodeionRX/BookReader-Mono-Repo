import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';
import { Book } from 'src/book/book.model';
import { BookParameter } from 'src/book/book.parameter.model';
import { BookI18n } from 'src/book/book.i18n.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: false,
        models: [Account, User, Book, BookParameter, BookI18n],
      }),
    }),
  ],
})
export class DatabaseModule {}
