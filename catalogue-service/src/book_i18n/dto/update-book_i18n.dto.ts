import { PartialType } from '@nestjs/mapped-types';
import { CreateBookI18nDto } from './create-book_i18n.dto';

export class UpdateBookI18nDto extends PartialType(CreateBookI18nDto) {}
