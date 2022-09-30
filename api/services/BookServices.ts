import BadRequestException from '../../handlers/BadRequestException';
import { Books } from '../models/index';
import { BookServicesInterface } from './interfaces/BookServicesInterfaces';

export default class BookServices implements BookServicesInterface {
  public async index(): Promise<object> {
    const getAllBooks = await Books.findAll();

    return getAllBooks;
  }

  public async getBookById(id: string): Promise<object> {
    if (!id) throw new BadRequestException();
    const getBookById = await Books.findByPk(id);

    if (!getBookById) throw new BadRequestException('Book not found');

    return getBookById || {};
  }
}
