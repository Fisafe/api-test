import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { connectServerBd } from './infra/typeorm/db';
import { userRouter } from './route/user.router';
import { authRouter } from './route/auth.router';
import { costCenterRouter } from './route/costCenter.router';
import { departmentRouter } from './route/department.router';
import { positionRouter } from './route/position.router';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

connectServerBd();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/costCenters', costCenterRouter);
app.use('/departments', departmentRouter);
app.use('/positions', positionRouter);
app.use('/', (req, res) => res.send('API test'));
