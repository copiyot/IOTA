import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({
    type: Number,
  })
  readonly itemId: number;

  @ApiProperty({
    type: Number,
  })
  readonly quantity: number;
}
