import { Router } from "express";

import { PositionController } from '../presentation/controllers/PositionController';
import authMiddlewares from "../shared/middlewares/authMiddlewares";

const positionRouter = Router();

positionRouter.route('/')
  .post(PositionController.create)
  
  .get(authMiddlewares)
  .get(PositionController.findAll);

positionRouter.route('/:positionId')
  .get(authMiddlewares)
  .get(PositionController.findById)

  .put(authMiddlewares)
  .put(PositionController.updateById)

  .delete(authMiddlewares)
  .delete(PositionController.deleteById)

export { positionRouter };
