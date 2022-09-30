import BadRequestException from '../../handlers/BadRequestException';
import { Books, BooksRecords, Users } from '../models/index';
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

  public async getHistory(): Promise<object> {
    const getHistory = await BooksRecords.findAll({
      order: [['movement_date', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['firstname', 'lastname', 'username'],
        },
        {
          model: Books,
        },
      ],
    });

    return getHistory || {};
  }
}
