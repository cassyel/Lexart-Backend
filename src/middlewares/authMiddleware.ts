import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';

interface AuthenticatedRequest extends Request {
  user?: unknown;
}

class AuthMiddleware {
  private secretKey: string;

  constructor() {
    this.secretKey = env.JWT_SECRET || '';
  }

  middleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ success: false, errorMessage: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, this.secretKey) as jwt.JwtPayload;
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, errorMessage: 'Token inválido' });
    }
  }

  // Função auxiliar para ser usada diretamente nas rotas
  getMiddleware(): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void {
    return (req, res, next) => this.middleware(req, res, next);
  }
}

export default AuthMiddleware;
