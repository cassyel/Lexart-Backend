import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class Details {
  @Expose()
    brand: string;

  @Expose()
    model: string;

  @Expose()
    color: string;

  constructor(brand: string, model: string, color: string) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
}

// Estrutura 1 DTO
@Exclude()
export class ProductDTO1 {
  @Expose()
    id?: string;

  @Expose()
    name: string;

  @Expose()
    brand: string;

  @Expose()
    model: string;

  @Expose()
    price: number;

  @Expose()
    color: string;

  constructor(name: string, brand: string, model: string, price: number, color: string, id?: string) {
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.price = price;
    this.color = color;
    this.id = id;
  }
}

// Estrutura 2 DTO
@Exclude()
export class ProductDTO2 {
  @Expose()
    id?: string;

  @Expose()
    name: string;

  @Expose()
    details: Details;

  @Expose()
    price: number;

  constructor(name: string, details: Details, price: number, id?: string) {
    this.name = name;
    this.details = details;
    this.price = price;
    this.id = id;
  }
}

// Estrutura 3 DTO
export class ProductData {
  @Expose()
    price: number;

  @Expose()
    color: string;

  constructor(price: number, color: string) {
    this.price = price;
    this.color = color;
  }
}

@Exclude()
export class ProductDTO3 {
  @Expose()
    id?: string;

  @Expose()
    name: string;

  @Expose()
    brand: string;

  @Expose()
    model: string;

  @Expose()
    data: ProductData[];

  constructor(name: string, brand: string, model: string, data: ProductData[], id?: string) {
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.data = data;
    this.id = id;
  }
}
