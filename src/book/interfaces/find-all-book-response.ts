import { Book } from '../book.model';

export interface IFindBooksResponse {
  rows: Book[];
  count: number;
}
