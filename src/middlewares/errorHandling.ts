import { Response, Request } from 'express';

class ErrorHandler {
  public static handleServerError(err: Error, req: Request, res: Response): void {
    res.status(500).json({ error: err.message });
  }
}

export default ErrorHandler;
