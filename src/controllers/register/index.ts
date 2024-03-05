import { Request, Response } from 'express';
import { RegisterService } from '../../services/register';
import { RegisterDto } from './dto/register.dto';
import { registerJoiSchema } from './joi';

export class RegisterController {
  private registerService = new RegisterService();

  async register(req: Request, res: Response) {
    const newUserData: RegisterDto = req.body;

    const { error } = registerJoiSchema.validate(newUserData);

    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message, success: false });
    }

    const { code, ...responseData } = await this.registerService.registerService(newUserData);
    return res.status(code).json(responseData);
  }
}
