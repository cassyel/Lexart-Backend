import Joi from 'joi';
import { ProductDTO1, ProductDTO2, ProductDTO3 } from '../dto/newProduct.dto';

const productDataSchema = Joi.object({
  price: Joi.number().required().messages({ 'any.required': 'O campo "price" é obrigatório' }),
  color: Joi.string().required().messages({ 'any.required': 'O campo "color" é obrigatório' }),
});

// Estrutura 1
export const productDTO1JoiSchema: Joi.ObjectSchema<ProductDTO1> = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'O campo "name" é obrigatório' }),
  brand: Joi.string().required().messages({ 'any.required': 'O campo "brand" é obrigatório' }),
  model: Joi.string().required().messages({ 'any.required': 'O campo "model" é obrigatório' }),
  price: Joi.number().required().messages({ 'any.required': 'O campo "price" é obrigatório' }),
  color: Joi.string().required().messages({ 'any.required': 'O campo "color" é obrigatório' }),
}).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'string.email': 'O formato do "email" é inválido',
  'string.min': '"password" deve conter pelo menos 8 caracteres',
});

// Estrutura 2
export const productDTO2JoiSchema: Joi.ObjectSchema<ProductDTO2> = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'O campo "name" é obrigatório' }),
  details: Joi.object({
    brand: Joi.string().required().messages({ 'any.required': 'O campo "brand" é obrigatório' }),
    model: Joi.string().required().messages({ 'any.required': 'O campo "model" é obrigatório' }),
    color: Joi.string().required().messages({ 'any.required': 'O campo "color" é obrigatório' }),
  }).required().messages({ 'any.required': 'O objeto de "details" é obrigatório', 'object.base': '"details" deve ser um objeto', 'object.unknown': '{{#label}} não está atribuido' }),
  price: Joi.number().required().messages({ 'any.required': 'O campo "price" é obrigatório' }),
}).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'string.email': 'O formato do "email" é inválido',
  'string.min': '"password" deve conter pelo menos 8 caracteres',
});

// Estrutura 3
export const productDTO3JoiSchema: Joi.ArraySchema<ProductDTO3[]> = Joi.array().items(
  Joi.object({
    name: Joi.string().required().messages({ 'any.required': 'O campo "name" é obrigatório' }),
    brand: Joi.string().required().messages({ 'any.required': 'O campo "brand" é obrigatório' }),
    model: Joi.string().required().messages({ 'any.required': 'O campo "model" é obrigatório' }),
    data: Joi.array().items(productDataSchema).required().min(1).messages({
      'any.required': 'O array "data" é obrigatório',
      'array.min': 'O array "data" deve conter pelo menos um objeto com os seguintes dados "price" e "color".',
    }),
  })
).min(1).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'string.email': 'O formato do "email" é inválido',
  'string.min': '"password" deve conter pelo menos 8 caracteres',
  'array.min': 'O array deve conter pelo menos um objeto com os seguintes dados "name", "brand", "model", "data"'
});
