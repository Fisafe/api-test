import { Request, Response } from 'express';
import { DepartmentService } from '../../service/department/DepartmentService';
import { StatusError } from '../../shared/errors/StatusError';
import { StatusErrorHandler } from '../../shared/handlers/StatusErrorHandler';

class DepartmentController {
  static async create(req: Request, res: Response) {
    try {
      const { body } = req;

      const departmentCreated = await DepartmentService.create(body).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(departmentCreated);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const costCenterId = req.query.costCenterId as string;

      let departmentsFound;

      if (costCenterId) {
        departmentsFound = await DepartmentService.findAllWithFilter(
          { 
            costCenterId: parseInt(costCenterId)
          }
        ).catch(error => {
          throw new StatusError(400, error);
        });
      } else {
        departmentsFound = await DepartmentService.findAll().catch(error => {
          throw new StatusError(400, error);
        });
      }
  
      return res.status(200).send(departmentsFound);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const departmentId = parseInt(req.params.departmentId);

      const department = await DepartmentService.findById(departmentId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(department);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const departmentId = parseInt(req.params.departmentId);
      const { body } = req;

      const department = await DepartmentService.updateById({departmentId, ...body}).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send(department);
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const departmentId = parseInt(req.params.departmentId);

      await DepartmentService.deleteById(departmentId).catch(error => {
        throw new StatusError(400, error);
      });
  
      return res.status(200).send({ message: 'deleted' });
    } catch (error: any) {
      StatusErrorHandler.handle(error);
      return res.status(error.status).send(error);

    }
  }
}

export { DepartmentController };
