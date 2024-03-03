import { LoginDto } from '../../controllers/login/dto/login.dto';
import { LoginResponse } from '../../controllers/login/dto/login.response';
import User from '../../models/User';

export class LoginService {
  async login(userData: LoginDto) {
    const response = new LoginResponse();

    try {
      const user = await User.findOne({ where: { email: userData.email } });

      if (!user || !(await user.comparePassword(userData.password))) {
        // Credenciais inválidas
        response.code = 401;
        response.success = false;
        response.errorMessage = 'Credenciais inválidas';
      } else {
        // Credenciais válidas
        response.code = 200;
        response.success = true;
        response.token = 'ADICIONAR TOKEN JWT';
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
