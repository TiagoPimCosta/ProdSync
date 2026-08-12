import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateLineRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  name: string;
}

export class UpdateLineRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;
}
