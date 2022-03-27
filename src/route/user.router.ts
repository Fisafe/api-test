import { Router } from "express";

import { UserController } from '../presentation/controllers/UserController';
import authMiddlewares from "../shared/middlewares/authMiddlewares";

const userRouter = Router();

userRouter.route('/')
  .post(UserController.create)
  
  .get(authMiddlewares)
  .get(UserController.findAll);

userRouter.route('/:userId')
  .get(authMiddlewares)
  .get(UserController.findById)

  .put(authMiddlewares)
  .put(UserController.updateById)

  .delete(authMiddlewares)
  .delete(UserController.deleteById)

export { userRouter };
