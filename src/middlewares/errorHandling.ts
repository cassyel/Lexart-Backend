import { Response, Request } from 'express';

export function serverError(err: Error, _req: Request, res: Response) {
  res.status(500).json({ error: err.message });
}
