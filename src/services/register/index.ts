import { RegisterDto } from '../../controllers/register/dto/register.dto';
import { RegisterResponse } from '../../controllers/register/dto/register.response';
import User from '../../models/User';

export class RegisterService {
  async registerService(newUser: RegisterDto) {
    const response = new RegisterResponse();

    try{
      await User.create(newUser);
      response.code = 201;
      response.success = true;
    } catch(error) {
      console.log(error);

      response.code = 400;
      response.success = false;
    }

    return { success: response.success, code: response.code };
  }
}
