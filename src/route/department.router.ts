import { Router } from "express";

import { DepartmentController } from '../presentation/controllers/DepartmentController';
import authMiddlewares from "../shared/middlewares/authMiddlewares";

const departmentRouter = Router();

departmentRouter.route('/')
  .post(DepartmentController.create)
  
  .get(authMiddlewares)
  .get(DepartmentController.findAll);

departmentRouter.route('/:departmentId')
  .get(authMiddlewares)
  .get(DepartmentController.findById)

  .put(authMiddlewares)
  .put(DepartmentController.updateById)

  .delete(authMiddlewares)
  .delete(DepartmentController.deleteById)

export { departmentRouter };
