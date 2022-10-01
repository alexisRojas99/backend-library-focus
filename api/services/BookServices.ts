import { Op } from 'sequelize';
import BadRequestException from '../../handlers/BadRequestException';
import RequestException from '../../handlers/RequestException';
import DB from '../database/sequelize/DB';
import { Books, BooksRecords, Users } from '../models/index';
import {
  BookServicesInterface, RequestQuery, RequestQueryCreateBook, RequestQueryCreateHistoryBook,
} from './interfaces/BookServicesInterfaces';

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

  public async createBook(book: RequestQueryCreateBook): Promise<object> {
    const checkBook = await Books.findOne({
      where: { isbn: book.isbn },
    });

    if (checkBook) throw new BadRequestException('Book already exists');

    const data = {
      isbn: book.isbn,
      title: book.title.toUpperCase(),
      image: book.image,
      author: book.author.toUpperCase(),
      published_year: book.published_year,
      genre: book.genre.toUpperCase(),
      stock: book.stock,
    };
    const createBook = await Books.create(data);

    return createBook || {};
  }

  public async createHistoryBook(book: RequestQueryCreateHistoryBook): Promise<object> {
    const t = await DB.connection().transaction();

    const checkBook = (await BooksRecords.findOne({
      where: { isbn: book.isbn },
    })) as any;

    const dataUpdate = {
      quantity: checkBook ? checkBook.quantity + 1 : book.quantity,
      movement_type: 'ENTRY',
    };

    // Validate stock of book
    const checkStock = (await Books.findByPk(book.isbn)) as any;

    if (checkStock.stock === '0') throw new BadRequestException('No stock available');

    try {
      // Validate if book exists in history
      if (checkBook) {
        await BooksRecords.update(dataUpdate, {
          where: { isbn: book.isbn },
          transaction: t,
        });

        await Books.update(
          { stock: checkStock.stock - 1 },
          {
            where: { isbn: book.isbn },
            transaction: t,
          },
        );

        await t.commit();
        return {
          message: 'Book reserved successfully',
        };
      }

      // Validate when book not exists in history
      const data = {
        isbn: book.isbn,
        id_user: book.id_user,
        quantity: 1,
        movement_type: 'ENTRY',
      };

      const createHistory = await BooksRecords.create(data, { transaction: t });

      await Books.update(
        { stock: checkStock.stock - 1 },
        {
          where: { isbn: book.isbn },
          transaction: t,
        },
      );

      await t.commit();
      return createHistory || {};
    } catch (err) {
      console.log(err);

      await t.rollback();
      throw new RequestException();
    }
  }
}
