import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignupInputModel {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MaxLength(16)
  password: string;
}
