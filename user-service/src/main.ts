import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
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
  });

  await microservice.listen();
}

bootstrap();
