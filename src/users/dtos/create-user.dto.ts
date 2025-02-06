import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

// interface ICreateUserDto {
//   firstName: string;
//   lastName?: string;
//   email: string;
//   password: string;
//   sayHello: () => void;
// }

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  @Type(() => String)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password?: string;

  sayHello() {
    console.log(`hello my name is ${this.firstName}`);
  }
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
