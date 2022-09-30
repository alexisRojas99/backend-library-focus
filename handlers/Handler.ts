import { Request, Response, NextFunction } from 'express';
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export default class Handler {
  static handlerErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    next(err);
  }

  static handleError(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
}
