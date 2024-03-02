import { Request, Response, Router } from 'express';


const router = Router();

// List Categories
router.get('/categories', (_req: Request, res: Response) => {
  return res.status(200);
});


export default router;
