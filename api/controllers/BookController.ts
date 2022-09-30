import { Request, Response } from 'express';
import { HttpCode } from '../../configs/HttpCode';
import {
  BookServicesInterface, RequestBody, RequestParams, RequestQuery, ResponseBody,
} from '../services/interfaces/BookServicesInterfaces';

export default class BookController {
  constructor(private readonly bookServices: BookServicesInterface) {}

  public async index(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response): Promise<object> {
    // const { page, per_page: perPage, username, is_suspended: isSuspended } = req.query;

    const response = await this.bookServices.index();

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async getBookById(req: Request, res: Response): Promise<object> {
    const { id } = req.params;

    const response = await this.bookServices.getBookById(id);

    return res.status(HttpCode.HTTP_OK).json(response);
  }
}
