import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { LoginService } from '../../services/login';
import { loginJoiSchema } from './joi';

export class LoginController {
  private loginService = new LoginService();

  async login(req: Request, res: Response) {
    const userData: LoginDto = req.body;

    const { error } = loginJoiSchema.validate(userData);

    if (error)
      return res.status(400).json({ errorMessage: error.details[0].message, success: false });

    const { code, ...responseData } = await this.loginService.login(userData);
    return res.status(code).json(responseData);
  }
}
