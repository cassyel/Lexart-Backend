import express, { Express } from 'express';
import sequelize from './config/database';
import cors from 'cors';
import ErrorHandler from './middlewares/errorHandling';
import router from './routes/router';
import { env } from './env';

class App {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
    this.setup();
  }

  private async setup() {
    try {
      await sequelize.authenticate(); // Verifica a autenticação do banco de dados

      await sequelize.sync();

      console.log('Conexão efetuada');

      this.expressApp.use(express.json());
      this.expressApp.use(cors());
      this.expressApp.use(router);
      this.expressApp.use(ErrorHandler.handleServerError);

      this.startServer();
    } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
      sequelize.close(); // Fecha a conexão com o banco de dados em caso de erro
    }
  }

  private startServer() {
    const port = env.PORT;
    this.expressApp.listen(port, () => console.log(`Server running on port ${port}`));
  }

  getExpressApp(): Express {
    return this.expressApp;
  }
}

export default new App();
