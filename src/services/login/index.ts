import { LoginDto } from '../../controllers/login/dto/login.dto';
import { LoginResponse } from '../../controllers/login/dto/login.response';
import { env } from '../../env';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export class LoginService {
  async login(userData: LoginDto) {
    const response = new LoginResponse();

    const user = new User();
    user.email = userData.email;

    try {
      const user = await User.findOne({ where: { email: userData.email } });

      if (!user || !(await user.comparePassword(userData.password))) {
        // Credenciais inválidas
        response.code = 401;
        response.success = false;
        response.errorMessage = 'Credenciais inválidas';
      } else {
        const tokenJwt = jwt.sign({ email: user.email, id: user.id }, env.JWT_SECRET);

        response.code = 200;
        response.success = true;
        response.token = tokenJwt;
      }
    } catch (error) {
      // Erro interno do servidor
      response.code = 500;
      response.success = false;
      response.errorMessage = 'Erro interno do servidor';
    }

    return response;
  }
}
