import { Book } from 'src/book/book.model';
import { BookResponse } from './book.response';

export class AllBooksResponse {
  books: BookResponse[] | any;
  total: number;

  constructor(books: Book[] | BookResponse[]) {
    this.books = books.map((book) => new BookResponse(book, book.translations));
    this.total = books.length;
  }
}
