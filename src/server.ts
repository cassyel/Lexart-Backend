import express, { Express } from 'express';
import sequelize from './config/database';
import cors from 'cors';
import ErrorHandler from './middlewares/errorHandling';
import router from './routes/router';

class App {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
  }

  public async setup() {
    try {
      await sequelize.authenticate();
      this.expressApp.listen(3000, () => console.log('servidor rodando na porta 3000'));
      // await sequelize.sync();
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

  public getExpressApp(): Express {
    return this.expressApp;
  }
}

// Exporta a função que cria e inicializa o servidor
export default async function createServer(): Promise<Express> {
  const app = new App();
  await app.setup();
  return app.getExpressApp();
}

// Se estiver executando como script principal, inicia o servidor
// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;
//   createServer().then((app) => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   });
// }
