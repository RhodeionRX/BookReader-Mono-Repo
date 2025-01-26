import { Book } from '../entity/book.entity';
import { BookResponse } from './book.response';

export class AllBooksResponse {
  books: BookResponse[];
  total: number;

  constructor(books: Book[]) {
    this.books = books.map((book) => new BookResponse(book, book.translations));
    this.total = books.length;
  }
}
