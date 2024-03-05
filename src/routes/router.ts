import { LoginController } from './../controllers/login/index';
import { Router, Request, Response } from 'express';
import { RegisterController } from '../controllers/register';
import AuthMiddleware from '../middlewares/authMiddleware';
import { ProductController } from '../controllers/product';
import { ExternalAuthValidator } from '../middlewares/externalAuthValidator';
import { ExternalAuthController } from '../controllers/externalAuth';

class MyRouter {
  private router: Router = Router();
  private registerController = new RegisterController();
  private loginController = new LoginController();
  private authMiddleware = new AuthMiddleware();
  private productController = new ProductController();
  private externalAuthValidator = new ExternalAuthValidator();
  private externalAuthController = new ExternalAuthController();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    // Rotas para se registrar e logar no frontend
    this.router.post('/register', (req: Request, res: Response) => this.registerController.register(req, res));
    this.router.post('/login', (req: Request, res: Response) => this.loginController.login(req, res));

    // Rota para gerar token de acesso externo
    this.router.post('/external-auth', (req: Request, res: Response) => this.externalAuthController.generateToken(req, res));

    // Rotas para uso externo (adiciona middleware de validação)
    this.router.post('/external/product', this.externalAuthValidator.validateToken, (req: Request, res: Response) => this.productController.createProduct(req, res));
    this.router.get('/external/products', this.externalAuthValidator.validateToken, (req: Request, res: Response) => res.send('ok'));

    // Adiciona verificação JWT para as rotas abaixo
    this.router.use(this.authMiddleware.getMiddleware());

    // Rotas para uso da aplicação frontend
    this.router.post('/product', (req: Request, res: Response) => this.productController.createProduct(req, res));
    this.router.get('/products', (req: Request, res: Response) => res.send('ok'));
    this.router.patch('/product', (req: Request, res: Response) => this.productController.updateProduct(req, res));
    this.router.delete('/product', (req: Request, res: Response) => this.productController.deleteProduct(req, res));
    this.router.post('/product/variant', (req: Request, res: Response) => this.productController.createVariant(req, res));
    this.router.patch('/product/variant', (req: Request, res: Response) => this.productController.updateVariant(req, res));
    this.router.delete('/product/variant', (req: Request, res: Response) => this.productController.deleteVariant(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}

const myRouter = new MyRouter();
export default myRouter.getRouter();
