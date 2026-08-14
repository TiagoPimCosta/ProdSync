import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateRecordRequestDto {
  @ApiProperty({
    description:
      'Machine the action was performed on. The user is derived from the authenticated JWT.',
  })
  @IsUUID()
  machineId: string;
}
