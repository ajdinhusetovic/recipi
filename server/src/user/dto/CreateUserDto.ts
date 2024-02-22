import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'Username should be at least 3 characters long. ' })
  @MaxLength(30, { message: 'Username should not be longer than 20 characters. ' })
  @IsNotEmpty({ message: 'Username missing. ' })
  readonly username: string;

  @IsEmail({}, { message: 'Invalid email type. ' })
  @IsNotEmpty({ message: 'Email missing. ' })
  readonly email: string;

  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password missing.' })
  readonly password: string;
}
