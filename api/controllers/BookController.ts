import { Request, Response } from 'express';
import { HttpCode } from '../../configs/HttpCode';
import {
  BookServicesInterface,
  RequestBody,
  RequestParams,
  RequestQuery,
  RequestQueryGetHistory,
  ResponseBody,
} from '../services/interfaces/BookServicesInterfaces';

export default class BookController {
  constructor(private readonly bookServices: BookServicesInterface) {}

  public async index(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response): Promise<object> {
    const {
      isbn, title, genre, author,
    } = req.query;

    const response = await this.bookServices.index({
      isbn,
      title,
      genre,
      author,
    });

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async getBookById(req: Request, res: Response): Promise<object> {
    const { id } = req.params;

    const response = await this.bookServices.getBookById(id);

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async getHistory(req: Request<RequestParams, ResponseBody, RequestBody, RequestQueryGetHistory> | any, res: Response): Promise<object> {
    const response = await this.bookServices.getHistory(req?.user);

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async createBook(req: Request, res: Response): Promise<object> {
    const {
      isbn, title, image, author, published_year: publishedYear, genre, stock,
    } = req.body;

    const response = await this.bookServices.createBook({
      isbn,
      title,
      image,
      author,
      published_year: publishedYear,
      genre,
      stock,
    });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }

  public async createHistoryBook(req: Request, res: Response): Promise<object> {
    const {
      id_user: idUser, isbn, quantity, movement_type: movementType,
    } = req.body;

    const response = await this.bookServices.createHistoryBook({
      id_user: idUser,
      isbn,
      quantity,
      movement_type: movementType,
    });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }

  public async returnBook(req: Request, res: Response): Promise<object> {
    const { id } = req.body;

    const response = await this.bookServices.returnBook({ id });

    return res.status(HttpCode.HTTP_OK).json(response);
  }
}
