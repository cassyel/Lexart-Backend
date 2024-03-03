import { Expose, Exclude } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class RegisterDto{
  @Expose()
  @IsEmail()
    email!: string;

  @Expose()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
    password!: string;
}
