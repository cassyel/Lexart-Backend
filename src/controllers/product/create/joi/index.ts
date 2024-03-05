import Joi from 'joi';
import { ProductDTO1, ProductDTO2, ProductDTO3, VariantDTO } from '../dto/newProduct.dto';

const productDataSchema = Joi.object({
  price: Joi.number().required(),
  color: Joi.string().required(),
}).messages({ 'any.required': 'O campo {{#label}} é obrigatório ' });

// Estrutura 1
export const productDTO1JoiSchema: Joi.ObjectSchema<ProductDTO1> = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
}).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'any.required': 'O campo {{#label}} é obrigatório'
});

// Estrutura 2
export const productDTO2JoiSchema: Joi.ObjectSchema<ProductDTO2> = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'O campo "name" é obrigatório' }),
  details: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
  }).required().messages({ 'any.required': 'O objeto de "details" é obrigatório', 'object.base': '"details" deve ser um objeto', 'object.unknown': '{{#label}} não está atribuido' }),
  price: Joi.number().required()
}).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'any.required': 'O campo {{#label}} é obrigatório'
});

// Estrutura 3
export const productDTO3JoiSchema: Joi.ArraySchema<ProductDTO3[]> = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    data: Joi.array().items(productDataSchema).required().min(1).messages({
      'any.required': 'O array "data" é obrigatório',
      'array.min': 'O array "data" deve conter pelo menos um objeto com os seguintes dados "price" e "color".',
    }),
  })
).min(1).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'array.min': 'O array deve conter pelo menos um objeto com os seguintes dados "name", "brand", "model", "data"',
  'any.required': 'O campo {{#label}} é obrigatório'
});


export const variantDTOJoiSchema: Joi.ObjectSchema<VariantDTO> = Joi.object({
  price: Joi.number().required(),
  color: Joi.string().required(),
  phoneId: Joi.string().required(),
}).messages({
  'string.empty': '{{#label}} não pode ser vazio',
  'number.base': '{{#label}} deve ser um número',
  'any.required': 'O campo {{#label}} é obrigatório'
});