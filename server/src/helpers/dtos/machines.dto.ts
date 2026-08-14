import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, Length, Min } from 'class-validator';

export class CreateMachineRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: 'ID of the line the machine belongs to.' })
  @IsUUID()
  line: string;

  @ApiProperty({ description: 'Expected actions per hour.' })
  @IsInt()
  @Min(1)
  cadence: number;
}

export class UpdateMachineRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: 'ID of the line the machine belongs to.' })
  @IsUUID()
  line: string;

  @ApiProperty({ description: 'Expected actions per hour.' })
  @IsInt()
  @Min(1)
  cadence: number;
}

export class UpdateMachineUserDto {
  @ApiProperty({ description: 'ID of the user to assign the machine to.' })
  @IsUUID()
  userId: string;
}
