import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { CreationAttributes, ModelAttributes } from 'sequelize/types/model';
import { RpcException } from '@nestjs/microservices';
import { I18nEnum } from 'enums/i18n.enum';
import { BookI18n } from 'src/book/book.i18n.model';
import { Op } from 'sequelize';
import {
  IFindBooksParams,
  IFindBooksResponse,
  IFindOneBookParams,
  IParameter,
} from './interfaces';
import { BookParameter } from './book.parameter.model';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book) private bookModel: typeof Book,
    @InjectModel(BookI18n) private i18nModel: typeof BookI18n,
    @InjectModel(BookParameter) private paramModel: typeof BookParameter,
  ) {}

  /** Create a book by specified parameters.
   *
   * Creates a new book entity in the database.
   *
   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.creator_account_id] - The ID of the account that created the book.
   * @param {string} [data.articul] - The unique article identifier of the book.
   *
   * @returns {Promise<Book|null>} - Returns the found book object if exists, otherwise `null`.
   * @example
   * // Create a new book
   * const book = await create({
   *   articul: 'BOOK-002',
   *   creator_account_id: '123e4567-e89b-12d3-a456-426614174000',
   * });
   */
  public async create(data: CreationAttributes<Book>): Promise<Book | null> {
    const book = await this.bookModel.create(data);

    return book;
  }

  /** Add an internationalization to a specified book.
   *
   * Creates a book i18n record in the database.
   *
   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.title] - The title in specified language of the book.
   * @param {string} [data.description] - The description in specified language of the book.
   *
   * @returns {Promise<BookI18n|null>} - Returns the found book object if exists, otherwise `null`.
   * @example
   * // Add a new translation
   * const book = await addI18n({
   *   title: 'test',
   *   description: 'test description',
   * });
   */
  public async addI18n(data: CreationAttributes<BookI18n>): Promise<BookI18n> {
    const bookI18n = await this.i18nModel.create(data);
    return bookI18n;
  }

  /** Creates a list of parameters for the book depending on its internalization.
   *
   * Creates a list of book parameters in the data base.
   *
   * @param {IParameter[]} params - List of parameters.
   * @param {string} [bookId] - The book identifier.
   * @param {I18nEnum} [i18n] - The language of the parameters value.
   *
   * @returns {Promise<BookParameter[]|null>} - Returns the list of parameters or null.
   * @example
   * // Add a parameters
   * const parameters = await addParameters(
   * [{label: 'Some label', value: 'Some value'}],
   * '123e4567-e89b-12d3-a456-426614174000',
   * 'FR'
   * })
   */
  public async addParameters(
    params: IParameter[],
    bookId: string,
    i18n: I18nEnum,
  ): Promise<BookParameter[] | null> {
    const preparedParameters = params.map((param) => {
      return {
        ...param,
        bookId,
        i18n,
      };
    });

    const paramList = await this.paramModel.bulkCreate(preparedParameters);
    return paramList;
  }

  /** Updates an internationalization of a specified book.
   *
   * Updates book's i18n record in the database.
   *
   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.title] - The title in specified language of the book.
   * @param {string} [data.description] - The description in specified language of the book.
   *
   * @returns {Promise<BookI18n|null>} - Returns the found book object if exists, otherwise `null`.
   * @example
   * // Add a new translation
   * const book = await updateI18n(
   * '123e4567-e89b-12d3-a456-426614174000',
   * 'FR'
   * {
   *   title: 'le livre de test',
   *   description: 'une description',
   * });
   */
  public async updateI18n(
    bookId: string,
    i18n: I18nEnum,
    data: {
      [key in keyof ModelAttributes<BookI18n>]?: ModelAttributes<BookI18n>[key];
    },
  ): Promise<BookI18n> {
    const i18nInstance = await this.i18nModel.findOne({
      where: {
        bookId,
        i18n,
      },
    });

    i18nInstance.update(data);
    i18nInstance.save();

    return i18nInstance;
  }

  /** Find one book by specified parameters.
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

  public async findOne(data: IFindOneBookParams): Promise<Book | null> {
    const { id, creator_account_id, createdAt, articul, i18n } = data;

    const whereClause = {
      ...(id && { id }),
      ...(creator_account_id && { creator_account_id }),
      ...(articul && { articul }),
      ...(createdAt && { createdAt }),
    };

    const book = this.bookModel.findOne({
      where: whereClause,
      include: [
        {
          model: BookI18n,
          as: 'translations',
        },
        {
          model: BookParameter,
          as: 'parameters',
          where: { ...(i18n && { i18n: i18n }) },
          required: false,
        },
      ],
    });

    return book;
  }

  /** Find one book by specified parameters.
   *
   * Searches for a single book entry in the database using the provided criteria.
   * @param {Object} data - Parameters to search for a book.
   * @param {string} [data.id] - The unique identifier of the book.
   * @param {string} [data.creator_account_id] - The ID of the account that created the book.
   * @param {Date} [data.createdAt] - The timestamp when the book was created.
   * @param {string} [data.articul] - The unique article identifier of the book.
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

  public async findOneOrFail(data: IFindOneBookParams): Promise<Book> {
    const book = this.findOne(data);

    if (!book) {
      throw new RpcException('Book does not exists');
    }

    return book;
  }

  /** Find and filter books by specified parameters.
   *
   * Searches for book entries in the database using the provided criteria.
   * @param {Object} params - Parameters to search for a book.
   * @param {string} [params.creator_account_id] - The ID of the account that created the book.
   * @param {string} [params.title] - The book's title.
   * @param {I18nEnum} [params.i18n] - The book localization, searches for books having specified localization.
   * @param {string} [params.articul] - The unique article identifier of the book.
   * @param {int} [params.size] - The size of the pool.
   * @param {int} [params.page] - The page.
   *
   * @returns {Promise<IFindBooksResponse>} - Returns the found books, total amount, amount of page and current page number.
   * @example
   * // Find books by a title
   * const books = await find({ title: 'test' });
   *
   * @example
   * // Find books by creator's account ID and article
   * const books = await find({ creator_account_id: '123e4567-e89b-12d3-a456-426614174000', articul: 'BOOK-001' });
   *
   * @throws {Error} If the query fails or the parameters are invalid
   */

  public async find(params: IFindBooksParams): Promise<IFindBooksResponse> {
    const { creator_account_id, title, articul, size = 10, page = 1 } = params;

    const whereClause = {
      ...(creator_account_id && { creator_account_id }),
      ...(articul && { [Op.eq]: articul }),
    };

    const i18nWhereClause = {
      ...(title && { title: { [Op.iLike]: `%${title}%` } }),
    };

    const offset = page * size - size;

    const bookList = await this.bookModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: BookI18n,
          where: i18nWhereClause,
          required: true,
        },
        {
          model: BookParameter,
          as: 'parameters',
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: size,
      offset,
    });

    return bookList;
  }

  /** Update a book.
   *
   * Updates a book with specified ID in the database using the provided data.
   * @param {string} id - The unique identifier of the book.
   * @param {Object} data - Parameters to be updated in the book.
   * @param {string} [data.articul] - The unique article identifier of the book.
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
