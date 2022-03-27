import { StatusError } from '../errors/StatusError';

class StatusErrorHandler {

  static handle(error: any): StatusError {
    if (!error.status) {
      //TODO: Adicionar log crítico?

      error.status = 500;
      error.message = 'Internal Server Error';
      error.name = 'ServerError';
    }
    return error;
  }
}

export { StatusErrorHandler };
