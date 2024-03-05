import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class GetAllProductResponse {
  @Expose()
    data: unknown;

  @Expose()
    success!: boolean;

  @Expose()
    code!: number;

  @Expose()
    errorMessage: string | undefined = undefined;
}
