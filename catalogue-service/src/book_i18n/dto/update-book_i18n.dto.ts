import { OmitType } from '@nestjs/mapped-types';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';

export class UpdateBookI18nDto extends OmitType(UpdateBookDto, ['articul']) {}
