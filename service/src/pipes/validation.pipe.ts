import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = this.prepareErrorList(errors);

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

  private prepareErrorList(
    errors: ValidationError[],
  ): Record<string, string | string[]> {
    const errorMessageList = {};

    // Go through the error array
    errors.forEach((error) => {
      // check if there is any nested errors
      if (error.children.length > 0) {
        error.children.forEach((errorChild) => {
          errorChild.children.forEach((errorNested) => {
            // The property name. Example: parameters[0].label
            const propertyName = `${error.property}[${errorChild.property}].${errorNested.property}`;

            errorMessageList[propertyName] = Object.values(
              errorNested.constraints,
            );
          });
        });
        // check if the entity contains list of messages
      } else if (error.constraints) {
        errorMessageList[error.property] = Object.values(error.constraints!);
      }
    });

    return errorMessageList;
  }
}
