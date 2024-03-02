import express, { Router, Request, Response } from 'express';
import { sequelize } from './config/database';
import User from './models/User';
import Phone from './models/Phone';
// import PhoneVariant from './models/PhoneVariant';
import Variant from './models/Variant';


const app = express();
const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world with TypeScript' });
});

app.use(express.json());
app.use(route);


sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Conexão efetuada');

    // Adicione seus modelos ao banco de dados, se necessário
    // Exemplo: User.sync();
    User.sync({ force: true });
    Phone.sync({ force: true });
    // PhoneVariant.sync({ force: true });
    Variant.sync({ force: true });

    // Phone.hasMany(PhoneVariant);
    // Variant.belongsTo(PhoneVariant);
    // PhoneVariant.belongsTo(Phone);
    // PhoneVariant.hasMany(Variant);

    app.listen(3333, () => {
      console.log('Server running on port 3333');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
    sequelize.close();
  });
