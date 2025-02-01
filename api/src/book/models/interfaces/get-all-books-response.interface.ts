import { Book } from '../entity';

export interface GetAllBooksResponse {
  rows: Book[];
  count: number;
}
