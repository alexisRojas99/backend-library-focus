type StatusCode = number;
type Description = string | undefined;

export default class BaseError extends Error {
  description: Description;

  statusCode: StatusCode;

  isOperational: boolean;

  constructor(name: string, statusCode: StatusCode, description: Description, isOperational = false) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
