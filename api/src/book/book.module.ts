import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

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
            queue: 'catalogue_queue',
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
