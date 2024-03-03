import { Request, Response } from 'express';
import { RegisterService } from '../../services/register';
import { RegisterDto } from './dto/register.dto';

export class RegisterController {
  private registerService = new RegisterService();

  async register(req: Request, res: Response) {
    const newUserData:RegisterDto = req.body;

    const { success, code } = await this.registerService
      .registerService(newUserData);

    return res.status(code).json({ success });
  }
}
