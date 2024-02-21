import { IsNotEmpty } from 'class-validator';

export class LogUserInDto {
  @IsNotEmpty({ message: 'Username is missing. ' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password is missing.' })
  readonly password: string;
}
