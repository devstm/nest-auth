import { ERRORS } from 'src/common/constants';
import { Matches, IsEmail, IsNotEmpty, IsAlphanumeric } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    // example: 'Password1!'
    message: ERRORS.PASSWORD_VALIDATION_ERROR,
  })
  password: string;
}
