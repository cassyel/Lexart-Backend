import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

export class ExternalAuthController {
  generateToken(req: Request, res: Response) {
    const randonId = randomUUID();
    const token = jwt.sign({ randonId }, env.EXTERNAL_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ externalAuthToken: token });
  }
}
