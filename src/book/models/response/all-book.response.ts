import { BookResponse } from './book.response';

export class AllBooksResponse {
  books: BookResponse[];
  total: number;
  page: number;
  pageTotal: number;

  constructor(
    { rows, count }: any, // TODO: fix any type
    page: number,
    size: number,
  ) {
    this.books = rows.map(
      (book) => new BookResponse(book, book.translations, book.parameters),
    );
    this.total = count;
    this.page = page;
    this.pageTotal = Math.ceil(count / size);
  }
}
