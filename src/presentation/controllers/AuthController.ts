import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';
import { StatusError } from '../../shared/errors/StatusError';
import { StatusErrorHandler } from '../../shared/handlers/StatusErrorHandler';

class AuthController {
  static async authenticate(req: Request, res: Response) {
    try {
      const { body } = req;

      const userAuth = await AuthService.authenticate(body).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(userAuth);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }
}

export { AuthController };
