import { HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';

export const handleMicroserviceException = (error: unknown) => {
  const errorMessage =
    error && typeof error === 'object' && 'message' in error
      ? error.message
      : 'Unknown error';

  return throwError(
    () =>
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        },
        HttpStatus.BAD_REQUEST,
      ),
  );
};
