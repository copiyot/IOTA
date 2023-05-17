import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    type: Number,
  })
  readonly price: number;
}
