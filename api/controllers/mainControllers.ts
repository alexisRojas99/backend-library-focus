import { Request, Response } from 'express';
import { HttpCode } from '../../configs/HttpCode';
import { MainServicesInterfaces } from '../services/interfaces/MainServicesInterfaces';

export default class MainControllers {
  constructor(private readonly mainServices: MainServicesInterfaces) {}

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const response = await this.mainServices.login({ username, password });

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async authToken(req: Request, res: Response) {
    const { user } = req as any;
    const response = await this.mainServices.authToken(user);

    return res.status(HttpCode.HTTP_OK).json(response);
  }
}
