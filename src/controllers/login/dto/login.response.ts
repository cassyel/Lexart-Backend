import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class LoginResponse {
  @Expose()
    success!: boolean;

  @Expose()
    token: string | undefined = undefined;

  @Expose()
    code!: number;

  @Expose()
    errorMessage: string | undefined = undefined;
}
