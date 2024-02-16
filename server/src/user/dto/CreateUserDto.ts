import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username missing. ' })
  readonly username: string;

  @IsNotEmpty({ message: 'Email missing. ' })
  @IsEmail({}, { message: 'Invalid email type. ' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password missing.' })
  readonly password: string;

  readonly bio?: string;
}
