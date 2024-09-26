import { IsNotEmpty, IsString } from 'class-validator';

export class LogInInputModel {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
