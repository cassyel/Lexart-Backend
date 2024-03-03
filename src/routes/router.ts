import { Router, Request, Response } from 'express';
import { RegisterController } from '../controllers/register';
import AuthMiddleware from '../middlewares/authMiddleware';

class MyRouter {
  private router: Router = Router();
  private registerController = new RegisterController();
  private authMiddleware = new AuthMiddleware();


  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/register', (req: Request, res: Response) => this.registerController.register(req, res));
    this.router.get('/login', (req: Request, res: Response) => this.registerController.register(req, res));

    // Adiciona verificação JWT para as rotas abaixo
    this.router.use(this.authMiddleware.getMiddleware());
  }

  getRouter(): Router {
    return this.router;
  }
}

const myRouter = new MyRouter();
export default myRouter.getRouter();