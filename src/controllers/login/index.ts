import { Request, Response } from 'express';
import { LoginDto, loginJoiSchema } from './dto/login.dto';
import { LoginService } from '../../services/login';

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
