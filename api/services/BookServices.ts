import { Op } from 'sequelize';
import BadRequestException from '../../handlers/BadRequestException';
import { Books, BooksRecords, Users } from '../models/index';
import { BookServicesInterface, RequestQuery } from './interfaces/BookServicesInterfaces';

export default class BookServices implements BookServicesInterface {
  public async index(queryFilters: RequestQuery): Promise<object> {
    const {
      isbn, title, genre, author,
    } = queryFilters;
    const filters: {
      isbn?: object;
      title?: object;
      genre?: object;
      author?: object;
    } = {};

    if (isbn) filters.isbn = { [Op.like]: `%${isbn}%` };
    if (title) {
      filters.title = {
        [Op.like]: `%${title.toUpperCase()}%`,
      };
    }
    if (author) {
      filters.author = { [Op.like]: `%${author.toUpperCase()}%` };
    }
    if (genre) {
      filters.genre = { [Op.like]: `%${genre.toUpperCase()}%` };
    }

    const getAllBooks = await Books.findAll({
      where: { ...filters },
    });

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
