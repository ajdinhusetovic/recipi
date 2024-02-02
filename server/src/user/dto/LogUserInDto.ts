import { IsNotEmpty } from 'class-validator';

export class LogUserInDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
