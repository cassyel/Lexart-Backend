import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RegisterResponse{
  @Expose()
    success!: boolean;

  @Expose()
    code!: number;

  @Expose()
    errorMessage: string | undefined = undefined;
}
