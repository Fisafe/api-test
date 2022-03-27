import { Request, Response } from 'express';
import { CostCenterService } from '../../service/costCenter/CostCenterService';
import { StatusError } from '../../shared/errors/StatusError';
import { StatusErrorHandler } from '../../shared/handlers/StatusErrorHandler';

class CostCenterController {
  static async create(req: Request, res: Response) {
    try {
      const { body } = req;

      const costCenterCreated = await CostCenterService.create(body).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(costCenterCreated);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const costCenters = await CostCenterService.findAll().catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(costCenters);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const costCenterId = parseInt(req.params.costCenterId);

      const costCenter = await CostCenterService.findById(costCenterId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(costCenter);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const costCenterId = parseInt(req.params.costCenterId);
      const { body } = req;

      const costCenter = await CostCenterService.updateById({costCenterId, ...body}).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(costCenter);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const costCenterId = parseInt(req.params.costCenterId);

      await CostCenterService.deleteById(costCenterId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send({ message: 'deleted' });
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }
}

export { CostCenterController };
