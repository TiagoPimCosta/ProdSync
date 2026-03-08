import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty()
  idNumber: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  cc: string;

  @ApiProperty()
  nif: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  admission: Date;
}

export class UpdateUserRequestDto {
  @ApiProperty()
  idNumber?: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  cc?: string;

  @ApiProperty()
  nif?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  status?: boolean;

  @ApiProperty()
  admission?: Date;
}
