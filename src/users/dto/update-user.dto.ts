import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
  isActive?: boolean;

  @ApiProperty()
  admission?: Date;
}
