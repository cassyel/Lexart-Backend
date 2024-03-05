import { LoginController } from './../controllers/login/index';
import { Router, Request, Response } from 'express';
import { RegisterController } from '../controllers/register';
import AuthMiddleware from '../middlewares/authMiddleware';
import { ProductController } from '../controllers/product';

class MyRouter {
  private router: Router = Router();
  private registerController = new RegisterController();
  private loginController = new LoginController();
  private authMiddleware = new AuthMiddleware();
  private productController = new ProductController();


  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/register', (req: Request, res: Response) => this.registerController.register(req, res));
    this.router.post('/login', (req: Request, res: Response) => this.loginController.login(req, res));

    // Adiciona verificação JWT para as rotas abaixo
    this.router.use(this.authMiddleware.getMiddleware());

    this.router.post('/product', (req: Request, res: Response) => this.productController.createProduct(req, res));
    this.router.post('/product/variant', (req: Request, res: Response) => this.productController.createVariant(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}

const myRouter = new MyRouter();
export default myRouter.getRouter();
