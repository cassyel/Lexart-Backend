import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class NewVariantResponse {
  @Expose()
    success!: boolean;

  @Expose()
    code!: number;

  @Expose()
    errorMessage: string | undefined = undefined;
}
