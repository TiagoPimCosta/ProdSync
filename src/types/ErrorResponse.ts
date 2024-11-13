import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Error Message' })
  message: string;

  @ApiProperty({ example: 'Type of Error', required: false })
  error?: string;
}
