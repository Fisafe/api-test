import { createConnection } from 'typeorm';
import { CostCenter } from './entities/CostCenter';
import { Department } from './entities/Department';
import { Position } from './entities/Position';
import { User } from './entities/User';

export const connectServerBd = async () => {
  const connect = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    entities: [User, CostCenter, Department, Position]
  });

  process.on('SIGINT', () => {
    connect.close();
  });
}
