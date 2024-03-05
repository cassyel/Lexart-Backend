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
  }

  public async setup() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Conexão efetuada');

      this.expressApp.use(express.json());
      this.expressApp.use(cors());
      this.expressApp.use(router);
      this.expressApp.use(ErrorHandler.handleServerError);
    } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
      sequelize.close();
    }
  }

  public startServer() {
    const port = env.PORT || 3000;
    this.expressApp.listen(port, () => console.log(`Server running on port ${port}`));
  }

  public getExpressApp(): Express {
    return this.expressApp;
  }
}

// Exporta a função que cria e inicializa o servidor
export default async function createServer(): Promise<Express> {
  const app = new App();
  await app.setup();
  app.startServer();
  return app.getExpressApp();
}

createServer();
