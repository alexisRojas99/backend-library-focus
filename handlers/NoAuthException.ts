import BaseError from './BaseError';
import { HttpCode } from '../configs/HttpCode';

export default class NoAuthException extends BaseError {
  constructor(description = 'No autenticado') {
    super('UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED, description);
  }
}
