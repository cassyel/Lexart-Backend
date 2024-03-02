import express from 'express';
import sequelize from './config/database';
import cors from 'cors';

import User from './models/User';
import Phone from './models/Phone';
import Variant from './models/Variant';

import router from './routes/router';
import { serverError } from './middlewares/errorHandling';


const app = express();

sequelize.sync().then(() => {
  console.log('Conexão efetuada');

  User.sync();
  Phone.sync();
  Variant.sync();

  app.use(express.json());
  app.use(router);
  app.use(cors());
  app.use(serverError);

  app.listen(3333, () => console.log('Server running on port 3333'));
})
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
    sequelize.close();
  });
