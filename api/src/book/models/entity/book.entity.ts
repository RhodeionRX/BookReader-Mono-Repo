import { BookTranslation } from './book-translation.entity';

export class Book {
  public readonly id: string;
  public readonly title: string;
  public readonly articul?: string;
  public readonly translations?: BookTranslation[];
  public readonly creator_account_id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    title: string,
    creator_account_id: string,
    createdAt: Date,
    updatedAt: Date,
    articul?: string,
    translations?: BookTranslation[],
  ) {
    this.id = id;
    this.title = title;
    this.translations = translations;
    this.creator_account_id = creator_account_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.articul = articul;
  }
}
