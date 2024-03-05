import { Expose } from 'class-transformer';

export class VariantDTO {
  @Expose ()
    id?: string;

  @Expose()
    color: string;

  @Expose()
    price: number;

  @Expose()
    phoneId: string;

  constructor(color: string, price: number, phoneId: string, id?: string) {
    this.color = color;
    this.price = price;
    this.phoneId = phoneId;
    this.id = id;
  }
}
