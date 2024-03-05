import { ProductDTO1, ProductDTO2, ProductDTO3 } from '../../../controllers/product/create/dto/newProduct.dto';
import { NewProductResponse } from '../../../controllers/product/create/dto/newProduct.response';
import Phone from '../../../models/Phone';
import Variant from '../../../models/Variant';

export class ProductService {
  private async createProductDTO1(productData: ProductDTO1) {
    const newPhone = await Phone.create({
      name: productData.name,
      brand: productData.brand,
      model: productData.model,
    });

    await Variant.create({
      phoneId: newPhone.id,
      color: productData.color,
      price: productData.price,
    });
  }

  private async createProductDTO2(productData: ProductDTO2) {
    const newPhone = await Phone.create({
      name: productData.name,
      brand: productData.details.brand,
      model: productData.details.model,
    });

    await Variant.create({
      phoneId: newPhone.id,
      color: productData.details.color,
      price: productData.price,
    });
  }

  private async createProductDTO3Array(productData: ProductDTO3[]) {
    for (const productDTO3 of productData) {
      const newPhone = await Phone.create({
        name: productDTO3.name,
        brand: productDTO3.brand,
        model: productDTO3.model,
      });

      for (const productDataItem of productDTO3.data) {
        await Variant.create({
          phoneId: newPhone.id,
          color: productDataItem.color,
          price: productDataItem.price,
        });
      }
    }
  }

  async createProduct(productData: ProductDTO1 | ProductDTO2 | ProductDTO3[]) {
    const response = new NewProductResponse();

    try {
      if (Array.isArray(productData)) {
        await this.createProductDTO3Array(productData);
      } else if ('details' in productData) {
        await this.createProductDTO2(productData);
      } else {
        await this.createProductDTO1(productData);
      }
      response.code = 201;
      response.success = true;

    } catch (error) {
      response.code = 400;
      response.success = false;
      response.errorMessage = 'Erro ao criar um novo produto';
    }

    return response;
  }
}