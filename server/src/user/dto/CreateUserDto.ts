import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Min(8)
  readonly password: string;

  readonly bio?: string;
}
