import { Request, Response } from 'express';
import { PositionService } from '../../service/position/PositionService';
import { StatusError } from '../../shared/errors/StatusError';
import { StatusErrorHandler } from '../../shared/handlers/StatusErrorHandler';

class PositionController {
  static async create(req: Request, res: Response) {
    try {
      const { body } = req;

      const positionCreated = await PositionService.create(body).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(positionCreated);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const positions = await PositionService.findAll().catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(positions);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const positionId = parseInt(req.params.positionId);

      const position = await PositionService.findById(positionId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(position);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const positionId = parseInt(req.params.positionId);
      const { body } = req;

      const position = await PositionService.updateById({positionId, ...body}).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(position);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const positionId = parseInt(req.params.positionId);

      await PositionService.deleteById(positionId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send({ message: 'deleted' });
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }
}

export { PositionController };
