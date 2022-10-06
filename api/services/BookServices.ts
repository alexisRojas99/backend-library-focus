import { Op } from 'sequelize';
import BadRequestException from '../../handlers/BadRequestException';
import RequestException from '../../handlers/RequestException';
import DB from '../database/sequelize/DB';
import { Books, BooksRecords, Users } from '../models/index';
import {
  BookServicesInterface,
  RequestQuery,
  RequestQueryCreateBook,
  RequestQueryCreateHistoryBook,
  RequestQueryGetHistory,
  RequestQueryReturnBook,
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
      order: [['title', 'DESC']],
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

  public async getHistory(objUser: RequestQueryGetHistory): Promise<object> {
    const filters: any = {};

    if (objUser.roles[0] !== 'ROLE_LIBRARIAN') filters.id_user = objUser.id;

    if (objUser.roles[0] === 'ROLE_STUDENT' && Object.keys(objUser).length === 0) return [];

    const getHistory = await BooksRecords.findAll({
      order: [['movement_date', 'DESC']],
      where: { ...filters },
      include: [
        {
          model: Users,
          attributes: ['id', 'firstname', 'lastname', 'username'],
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
      movement_type: 'EGRESS',
      movement_date: new Date(),
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
        movement_type: 'EGRESS',
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

  public async returnBook(bookRecord: RequestQueryReturnBook): Promise<object> {
    const t = await DB.connection().transaction();

    const checkQuantity = (await BooksRecords.findByPk(bookRecord.id)) as any;
    const existBook = (await Books.findByPk(checkQuantity.isbn)) as any;

    if (!existBook) throw new BadRequestException('Book not found');
    if (checkQuantity.quantity === 0) throw new BadRequestException('You must reserve a book');

    const data = {
      quantity: checkQuantity.quantity - 1,
      movement_type: 'ENTRY',
      movement_date: new Date(),
    };

    try {
      await BooksRecords.update(data, {
        where: { id: checkQuantity.id },
      });

      await Books.update({ stock: Number(existBook.stock) + 1 }, { where: { isbn: existBook.isbn } });

      await t.commit();
      return {
        message: 'Book returned successfully',
      };
    } catch (err) {
      console.log(err);

      await t.rollback();
      throw new RequestException();
    }
  }
}
