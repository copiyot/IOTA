import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    type: Number,
  })
  readonly quantity: number;

  @ApiProperty({
    type: Number,
  })
  readonly itemId: number;

  @ApiProperty({
    type: String,
  })
  readonly state: string;
}
