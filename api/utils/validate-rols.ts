/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpCode } from '../../configs/HttpCode';
import Roles from '../models/Roles';

const validateRole = (ROLE: string) => async (req: Request, res: Response, next: NextFunction) => {
  const dataRole = await Roles.findAll();

  const getRole: any = dataRole.find((element: any) => element.name === ROLE);

  if (!getRole) {
    return res.status(HttpCode.HTTP_OK).json({
      message: 'El Role no existe',
    });
  }
  const tokenString = req.header('authorization') as string;

  const [_, token] = tokenString.split(' ');

  const { user } = jwt.verify(token, process.env.SECRET_KEY_JWT as string) as any;

  const validate = user.roles.find((element: any) => element === getRole.name);

  if (!validate) {
    return res.status(HttpCode.HTTP_UNAUTHORIZED).json({
      message: 'UNAUTHORIZED',
    });
  }

  return next();
};

export default validateRole;
