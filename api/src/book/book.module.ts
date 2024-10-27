import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BookController],
  providers: [],
  imports: [
    ClientsModule,
    ClientsModule.registerAsync([
      {
        name: 'CATALOGUE_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `${configService.get<string>('BROKER_HOST')}:${configService.get<string>('BROKER_PORT')}`,
            ],
            queue: 'user_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class BookModule {}
