import { Router } from "express";

import { AuthController } from '../presentation/controllers/AuthController';

const authRouter = Router();

authRouter.route('/login')
  .post(AuthController.authenticate);

export { authRouter };
