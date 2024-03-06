import express from 'express';
import sequelize from './config/database';
import cors from 'cors';
import ErrorHandler from './middlewares/errorHandling';
import router from './routes/router';

async function createServer() {
  const app = express();
  const corsConfig = {
    origin: '*',
    credential: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  };

  try {
    await sequelize.authenticate();
    console.log('Conexão efetuada');

    app.use(express.json());
    app.options('', cors(corsConfig));
    app.use(cors(corsConfig));
    app.use(router);
    app.use(ErrorHandler.handleServerError);

    app.listen(3000, () => console.log(`Criando o servidor em: ${new Date()}`));

    return app; // Retornando a instância do servidor
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    await sequelize.close(); // Fechando a conexão com o banco de dados em caso de erro
    throw error; // Relançando o erro para que o Vercel possa tratar
  }
}

createServer();

export default createServer;
