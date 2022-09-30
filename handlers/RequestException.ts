import { HttpCode } from '../configs/HttpCode';
import BaseError from './BaseError';

export default class RequestException extends BaseError {
  /**
   *
   * @param {string} description - Descripción del error
   * @param {string} exception - Excepción que se produjo
   * @param {integer} statusCode - Código de estado
   */
  constructor(description = 'Valores no válidos', exception = 'BAD_REQUEST', statusCode = HttpCode.HTTP_BAD_REQUEST) {
    super(exception, statusCode, description);
  }
}
