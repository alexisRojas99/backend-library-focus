import { Books } from '../models/index';
import { BookServicesInterface } from './interfaces/BookServicesInterfaces';

export default class BookServices implements BookServicesInterface {
  public async index(): Promise<object> {
    const getAllBooks = await Books.findAll();

    return getAllBooks;
  }

  public async getBookById(id: number): Promise<object> {
    return { message: 'getBookById' };
  }
}
