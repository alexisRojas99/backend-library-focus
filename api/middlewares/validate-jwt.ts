import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpCode } from '../../configs/HttpCode';
import Handler from '../../handlers/Handler';
// import NoAuthException from '../../handlers/NoAuthException.mjs';
import RequestException from '../../handlers/RequestException';
import { Users } from '../models/index';

// eslint-disable-next-line consistent-return
const validateJWT = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header('authorization') as string;
    // eslint-disable-next-line no-unused-vars
    const [_, token] = authorization.split(' ');

    if (!token) {
      return res.status(HttpCode.HTTP_UNAUTHORIZED).json({
        message: 'No autenticado',
      });
    }

    const { user } = jwt.verify(token, process.env.SECRET_KEY_JWT as string) as any;

    const getUser = await Users.findOne({
      attributes: ['id', 'username', 'is_suspended'],
      where: {
        id: user.id,
        is_suspended: false,
      },
    });

    if (!getUser) {
      throw new RequestException('No autenticado', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);
    }

    req.user = user;

    next();
  } catch (err) {
    Handler.handleError(err, req, res, next);
  }
};

export default validateJWT;
