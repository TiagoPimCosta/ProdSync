import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Role } from 'src/auth/roles.enum';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  idNumber: number;

  @ApiProperty()
  @IsString()
  @Length(2, 255)
  name: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: string;

  @ApiProperty()
  @IsString()
  @Length(2, 255)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(4, 72)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(5, 20)
  cc: string;

  @ApiProperty({ description: 'Portuguese NIF: 9 digits.' })
  @IsNumberString()
  @Length(9, 9)
  nif: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Defaults to now when omitted.' })
  @IsOptional()
  @IsDateString()
  admission?: Date;
}

export class UpdateUserRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  idNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 255)
  name?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 255)
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(5, 20)
  cc?: string;

  @ApiPropertyOptional({ description: 'Portuguese NIF: 9 digits.' })
  @IsOptional()
  @IsNumberString()
  @Length(9, 9)
  nif?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(6, 20)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  admission?: Date;
}
