import Joi from 'joi';
import { RegisterDto } from '../dto/register.dto';

export const registerJoiSchema: Joi.ObjectSchema<RegisterDto> = Joi.object({
  email: Joi
    .string()
    .email()
    .required()
    .messages({ 'string.email': 'O formato do email é inválido' }),

  password: Joi
    .string()
    .min(8)
    .required()
    .messages({ 'string.min': 'Password deve conter pelo menos 8 caracteres' }),

}).messages({
  'any.required': '{{#label}} é obrigatório',
  'string.empty': '{{#label}} não pode ser vazio'
});
