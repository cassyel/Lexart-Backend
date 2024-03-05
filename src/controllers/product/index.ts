import { ProductDTO1, ProductDTO2, ProductDTO3, productDTO1JoiSchema, productDTO2JoiSchema, productDTO3JoiSchema } from './dto/newProduct.dto';
import { Request, Response } from 'express';
import Joi from 'joi';
// import { ProductService } from '../../services/product'; // Substitua pelo seu serviço real

export class ProductController {
  private productDTO1JoiSchema: Joi.ObjectSchema = productDTO1JoiSchema;

  private productDTO2JoiSchema: Joi.ObjectSchema = productDTO2JoiSchema;

  private productDTO3JoiSchema: Joi.ArraySchema = productDTO3JoiSchema;

  private validateProduct(data: ProductDTO1 | ProductDTO2 | ProductDTO3[], schema: Joi.ObjectSchema | Joi.ArraySchema): Joi.ValidationResult {
    return schema.validate(data);
  }

  public async validateAndCreateProduct(req: Request, res: Response) {
    try {
      const productData: ProductDTO1 | ProductDTO2 | ProductDTO3[] = req.body;

      let schema: Joi.ObjectSchema | Joi.ArraySchema;

      // Identifique a estrutura com base nos dados recebidos
      if (Array.isArray(productData)) {
        schema = this.productDTO3JoiSchema;
      } else if ('details' in productData) {
        schema = this.productDTO2JoiSchema;
      } else {
        schema = this.productDTO1JoiSchema;
      }

      const { error } = this.validateProduct(productData, schema);

      if (error) {
        return res.status(400).json({ errorMessage: error.details[0].message, success: false });
      } else {
        // LÓGICA QUE CHAMA O SERVICE
        return res.status(200).json({ message: 'Produto criado com sucesso!', success: true });
      }

    } catch (error) {
      // Em caso de erro interno
      console.error(error);
      return res.status(500).json({ errorMessage: 'Erro interno ao processar a solicitação', success: false });
    }
  }
}
