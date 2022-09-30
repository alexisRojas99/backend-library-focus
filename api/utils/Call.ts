/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

type asyncExpressFunction = (req:Request, res:Response)=>Promise<any>;

const Call = (method: asyncExpressFunction) => (req: Request, res: Response, next: NextFunction) => method(req, res).catch((e: any) => next(e));

export default Call;
