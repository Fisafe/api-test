import { Router } from "express";

import { CostCenterController } from '../presentation/controllers/CostCenterController';
import authMiddlewares from "../shared/middlewares/authMiddlewares";

const costCenterRouter = Router();

costCenterRouter.route('/')
  .post(CostCenterController.create)
  
  .get(authMiddlewares)
  .get(CostCenterController.findAll);

costCenterRouter.route('/:costCenterId')
  .get(authMiddlewares)
  .get(CostCenterController.findById)

  .put(authMiddlewares)
  .put(CostCenterController.updateById)

  .delete(authMiddlewares)
  .delete(CostCenterController.deleteById)

export { costCenterRouter };
