import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    const errorMessages = {};

    if (errors.length > 0) {
      errors.map((err) => {
        errorMessages[err.property] = Object.values(err.constraints);
      });

      throw new ValidationException(
        'Validation failed',
        HttpStatus.BAD_REQUEST,
        errorMessages,
      );
    }

    return value;
  }

  private toValidate(metatype: any) {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
