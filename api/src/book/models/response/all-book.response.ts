import { GetAllBooksResponse } from '../interfaces';
import { BookResponse } from './book.response';

export class AllBooksResponse {
  books: BookResponse[];
  total: number;
  page: number;
  pageTotal: number;

  constructor(
    { rows, count }: GetAllBooksResponse,
    page: number,
    size: number,
  ) {
    this.books = rows.map((book) => new BookResponse(book, book.translations));
    this.total = count;
    this.page = page;
    this.pageTotal = Math.ceil(count / size);
  }
}
