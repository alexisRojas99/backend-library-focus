// import { Request, Response, NextFunction } from 'express';
import ajv from '../utils/ajv-instance';
import { HttpCode } from '../../configs/HttpCode';

type dataObject = {
  // [key: string]: any; Permite validar cualquier key del objeto
  message?: string | undefined;
};

const validate = (schema: any, type = 'body') => {
  const ajvValidate = ajv.compile(schema);

  return (req: any, res: any, next: any) => {
    const valid = ajvValidate(req[type]);

    if (!valid) {
      const { errors } = ajvValidate;

      const respErrors = errors?.map((err) => {
        const data: dataObject = {};
        data.message = err.message;
        return data;
      });

      return res.status(HttpCode.HTTP_BAD_REQUEST).json(respErrors);
    }

    return next();
  };
};

export default validate;
