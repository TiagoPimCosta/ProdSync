import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordRequestDto {
  @ApiProperty({
    description:
      'Machine the action was performed on. The user is derived from the authenticated JWT.',
  })
  machineId: string;
}
