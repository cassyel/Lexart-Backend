import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterDto {
  @Expose()
    email!: string;

  @Expose()
    password!: string;
}
