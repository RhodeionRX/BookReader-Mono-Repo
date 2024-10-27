import { PartialType } from '@nestjs/mapped-types';
import { InitBookRequest } from './requests/init-book.request';

export class UpdateBookDto extends PartialType(InitBookRequest) {}
