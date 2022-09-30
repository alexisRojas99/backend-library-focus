import { Request, response, Response } from 'express';
import { HttpCode } from '../../configs/HttpCode';
import {
  RequestParams, ResponseBody, RequestBody, RequestQuery, UserServicesInterfaces,
} from '../services/interfaces/UserServicesInterfaces';

export default class UserController {
  constructor(private readonly userServices: UserServicesInterfaces) {}

  public async index(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) {
    const {
      page, per_page: perPage, username, is_suspended: isSuspended,
    } = req.query;

    const response = await this.userServices.index({
      page,
      per_page: perPage,
      username,
      is_suspended: isSuspended,
    });

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.userServices.getUserById(Number(id));

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async createUser(req: Request, res: Response) {
    const {
      firstname, lastname, username, id_role: idRole, password,
    } = req.body;

    const response = await this.userServices.createUser({
      firstname,
      lastname,
      username,
      id_role: idRole,
      password,
    });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }
}
