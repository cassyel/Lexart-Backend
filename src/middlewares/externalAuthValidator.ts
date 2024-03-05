import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export class ExternalAuthValidator {
  validateToken(req: Request, res: Response, next: NextFunction) {
    const externalAuthToken = req.headers['external-auth'];

    if (!externalAuthToken || typeof externalAuthToken !== 'string') {
      return res.status(401).json({ errorMessage: 'Token não fornecido' });
    }

    try {
      jwt.verify(externalAuthToken, env.EXTERNAL_SECRET);

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
}
