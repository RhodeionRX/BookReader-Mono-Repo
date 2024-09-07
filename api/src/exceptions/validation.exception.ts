import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  private readonly errors: Object | Array<string | Object>;

  constructor(
    response: string,
    status: number = HttpStatus.BAD_REQUEST,
    errors: Object | Array<string | Object>,
  ) {
    super(response, status);
    this.errors = errors;
  }

  public getErrors() {
    return this.errors;
  }
}
