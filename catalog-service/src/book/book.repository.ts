import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { CreationAttributes } from 'sequelize/types/model';
import { RpcException } from '@nestjs/microservices';
import { I18nEnum } from 'enums/i18n.enum';
import { BookI18n } from 'src/book_i18n/book_i18n.model';
import { Op } from 'sequelize';

interface IFindBookParams {
  id?: string;
  creator_account_id?: string;
  articul?: string;
  createdAt?: Date;
  i18n?: I18nEnum;
}

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Book) private model: typeof Book) {}

  // TODO add JS Doc
  public async create(data: CreationAttributes<Book>) {
    const book = await this.model.create(data);

    return book;
  }

  /** Find one book by specified parameters.
   *
   *
   * Searches for a single book entry in the database using the provided criteria.

   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.id] - The unique identifier of the book.
   * @param {string} [data.creator_account_id] - The ID of the account that created the book.
   * @param {Date} [data.createdAt] - The timestamp when the book was created.
   * @param {string} [data.articul] - The unique article identifier of the book.
   * @param {I18nEnum} [data.i18n]  - The identificator of book's internationalization
   *
   *
   * @returns {Promise<Book|null>} - Returns the found book object if exists, otherwise `null`.
   * @example
   * // Find a book by its ID
   * const book = await findOne({ id: '123e4567-e89b-12d3-a456-426614174000' });
   * 
   * @example
   * // Find a book by creator's account ID and article
   * const book = await findOne({ creator_account_id: '123e4567-e89b-12d3-a456-426614174000', articul: 'BOOK-001' });
   * 
   */

  public async findOne(data: IFindBookParams): Promise<Book | null> {
    const {
      id,
      creator_account_id,
      createdAt,
      articul,
      i18n = I18nEnum.ENGLISH,
    } = data;

    const whereClause = {
      ...(id && { id }),
      ...(creator_account_id && { creator_account_id }),
      ...(articul && { articul }),
      ...(createdAt && { createdAt }),
    };

    const includeWhereClause = {
      ...(i18n && { i18n }),
    };

    const book = this.model.findOne({
      where: whereClause,
      include: [
        {
          model: BookI18n,
          as: 'translations',
          where: includeWhereClause,
        },
      ],
    });

    return book;
  }

  /** Find one book by specified parameters.
   *
   *
   * Searches for a single book entry in the database using the provided criteria.

   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.id] - The unique identifier of the book.
   * @param {string} [data.creator_account_id] - The ID of the account that created the book.
   * @param {Date} [data.createdAt] - The timestamp when the book was created.
   * @param {string} [data.articul] - The unique article identifier of the book.
   *
   *
   * @returns {Promise<Book|null>} - Returns the found book object if exists.
   * @example
   * // Find a book by its ID
   * const book = await findOne({ id: '123e4567-e89b-12d3-a456-426614174000' });
   * 
   * @example
   * // Find a book by creator's account ID and article
   * const book = await findOne({ creator_account_id: '123e4567-e89b-12d3-a456-426614174000', articul: 'BOOK-001' });
   * 
   * @throws {Error} If the query fails or the parameters are invalid
   */

  public async findOneOrFail(data: IFindBookParams): Promise<Book> {
    const book = this.findOne(data);

    if (!book) {
      throw new RpcException('Book does not exists');
    }

    return book;
  }

  public async find(params: any) {
    const { creator_account_id, title, i18n, articul } = params;

    const whereClause = {
      ...(creator_account_id && { creator_account_id }),
      ...(articul && { [Op.eq]: articul }),
    };

    const i18nWhereClause = {
      ...(title && { [Op.iLike]: `%${title}%` }),
      ...(i18n && { i18n }),
    };

    const bookList = await this.model.findAll({
      where: whereClause,
      include: {
        model: BookI18n,
        where: i18nWhereClause,
      },
    });

    return bookList;
  }

  /** Update a book.
   *
   *
   * Updates a book with specified ID in the database using the provided data.
   * @param {string} id - The unique identifier of the book.
   * @param {Object} data - Parameters to be updated in the book.
   * @param {string} [data.articul] - The unique article identifier of the book.
   *
   *
   * @returns {Promise<Book>} - Returns the updated book object.
   * @example
   * // Update the articul of a book by ID
   * const updatedBook = await update('123e4567-e89b-12d3-a456-426614174000', {
   *   articul: 'NEW-ARTICUL',
   * });
   *
   * @throws {RpcException} If the book with the specified ID does not exist or operation fails.
   */

  public async update(id: string, data: { articul: string }): Promise<Book> {
    try {
      const book = await this.findOneOrFail({ id });

      book.update(data);
      book.save();

      return book;
    } catch (error) {
      throw new RpcException(error.message ?? 'Update book operation failed');
    }
  }

  /** Delete a book.
   *
   * Deletes a book with specified ID from the database.
   * @param {string} id - The unique identifier of the book.
   *
   * @returns {Promise<Book>} - Returns the updated book object.
   * @example
   * // Delete book by ID
   * const bookToDelete = await delete('123e4567-e89b-12d3-a456-426614174000');
   *
   * @throws {RpcException} If the book with the specified ID does not exist or operation fails.
   */
  public async delete(id: string): Promise<Book> {
    try {
      const book = await this.findOneOrFail({ id });
      book.destroy();

      return book;
    } catch (error) {
      throw new RpcException(error.message ?? 'Delete book operation failed');
    }
  }
}
