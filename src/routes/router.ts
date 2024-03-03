import { Router, Request, Response } from 'express';
import { RegisterController } from '../controllers/register';

class MyRouter {
  private router: Router = Router();
  private registerController = new RegisterController();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/register', (req: Request, res: Response) => this.registerController.register(req, res));
    // Adicione mais rotas conforme necessário
  }

  getRouter(): Router {
    return this.router;
  }
}

const myRouter = new MyRouter();
export default myRouter.getRouter();
