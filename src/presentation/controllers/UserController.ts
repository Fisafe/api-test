import { Request, Response } from 'express';
import { UserService } from '../../service/user/UserService';
import { StatusError } from '../../shared/errors/StatusError';
import { StatusErrorHandler } from '../../shared/handlers/StatusErrorHandler';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { body } = req;

      const userCreated = await UserService.create(body).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(userCreated);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const departmentId = req.query.departmentId as string;
      const positionId = req.query.positionId as string;

      let usersFound;

      if(departmentId || positionId) {
        usersFound = await UserService.findAllWithFilter(
          { 
            departmentId: parseInt(departmentId),
            positionId: parseInt(positionId),

          }
        ).catch(error => {
          throw new StatusError(400, error);
        });
      } else {
        usersFound = await UserService.findAll().catch(error => {
          throw new StatusError(400, error);
        });
      }
  
      return res.status(200).send(usersFound);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await UserService.findById(userId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(user);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { body } = req;

      const user = await UserService.updateById({userId, ...body}).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(user);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      await UserService.deleteById(userId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send({ message: 'deleted' });
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }
}

export { UserController };
