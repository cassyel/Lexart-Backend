import { Details, ProductDTO1, ProductDTO2, ProductDTO3, productDTO1JoiSchema, productDTO2JoiSchema, productDTO3JoiSchema } from './dto/newProduct.dto';
import { Request, Response } from 'express';
import { ProductService } from '../../../services/product/create';
import Joi from 'joi';

type optionsDTO = ProductDTO1 | ProductDTO2 | ProductDTO3[]

export class ProductController {
  private productService = new ProductService();
  private productDTO1JoiSchema: Joi.ObjectSchema = productDTO1JoiSchema;
  private productDTO2JoiSchema: Joi.ObjectSchema = productDTO2JoiSchema;
  private productDTO3JoiSchema: Joi.ArraySchema = productDTO3JoiSchema;

  private validateProduct(data: optionsDTO,schema: Joi.ObjectSchema | Joi.ArraySchema): Joi.ValidationResult {
    return schema.validate(data);
  }

  private createProductInstance(data: optionsDTO): optionsDTO {
    if (Array.isArray(data)) {
      return data.map(item => new ProductDTO3(
        item.name,
        item.brand,
        item.model,
        item.data
      ));

    } else if ('details' in data) {
      const details = new Details(
        data.details.brand,
        data.details.model,
        data.details.color
      );

      return new ProductDTO2(data.name, details, data.price);
    } else {
      return new ProductDTO1(
        data.name,
        data.brand,
        data.model,
        data.price,
        data.color
      );
    }
  }

  public async validateAndCreateProduct(req: Request, res: Response) {

    try {
      const productData: optionsDTO = req.body;

      let schema: Joi.ObjectSchema | Joi.ArraySchema;

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
        const productInstance = this.createProductInstance(productData);
        const { code, ...responseData }= await this.productService.createProduct(productInstance);
        return res.status(code).json(responseData);
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: 'Erro interno ao processar a solicitação', success: false });
    }
  }
}
