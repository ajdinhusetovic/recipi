import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3, { message: 'Username should be at least 3 characters long. ' })
  @MaxLength(30, { message: 'Username should not be longer than 20 characters. ' })
  readonly username: string;

  @IsOptional()
  @MaxLength(300, { message: 'Bio should not be longer than 300 characters' })
  readonly bio: string;
}
