const errorTypes = {
  NotFoundError: 1,
  InternalError: 2,
  InvalidArgument: 3,
};

const wrapMongoError = (err) => {
    // check t
}

const isErrorType = (errCode, err) => {
  return err.statusCode() === errCode;
};

class ServerError extends Error {
  constructor(errorCode, msg) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }

  statusCode() {
    return this.errorCode;
  }
}

module.exports = {
  ServerError,
  errorTypes,
};
