import express from 'express';
import sequelize from './config/database';
import cors from 'cors';
import ErrorHandler from './middlewares/errorHandling';
import router from './routes/router';

export default async function setupServer() {
  const app = express();

  try {
    await sequelize.authenticate();
    console.log('Conexão efetuada');

    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.use(ErrorHandler.handleServerError);

    const port = 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    sequelize.close();
  }
}

// Para iniciar o servidor, basta chamar a função setupServer
setupServer();
