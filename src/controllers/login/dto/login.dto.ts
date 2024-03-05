import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class LoginDto {
  @Expose()
    email!: string;

  @Expose()
    password!: string;
}
