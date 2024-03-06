import express from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/errorHandling';
import router from './routes/router';

const app = express();
const corsConfig = {
  origin: '*',
  credential: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
};

console.log('Conexão efetuada');

app.use(express.json());
app.options('', cors(corsConfig));
app.use(cors(corsConfig));
app.use(router);
app.use(ErrorHandler.handleServerError);


export default app;
