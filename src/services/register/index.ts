import { RegisterDto } from '../../controllers/register/dto/register.dto';
import { RegisterResponse } from '../../controllers/register/dto/register.response';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export class RegisterService {
  async registerService(newUser: RegisterDto) {
    const response = new RegisterResponse();

    try {
      // Verifica se o email já está em uso
      const existingUser = await User.findOne({ where:{ email: newUser.email } });
      if (existingUser) {
        response.code = 400;
        response.success = false;
        response.errorMessage = 'Email já registrado. Por favor, escolha outro.';
      } else {
        // Gera um hash seguro da senha
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        // Cria um novo usuário com o hash da senha
        await User.create({
          email: newUser.email,
          password: hashedPassword,
        });

        response.code = 201;
        response.success = true;
      }
    } catch (error) {
      console.error(error);

      response.code = 500;
      response.success = false;
      response.errorMessage = 'Erro interno do servidor';
    }

    return { success: response.success, code: response.code, errorMessage: response.errorMessage };
  }
}
