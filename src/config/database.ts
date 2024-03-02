// config/database.ts
import { Sequelize } from 'sequelize';
import { env } from '../env';

const sequelize = new Sequelize(env.POSTGRES_URL);

export default sequelize;
