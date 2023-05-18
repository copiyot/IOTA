import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Item } from '../items/items.entity';
import { ApiProperty } from '@nestjs/swagger';

interface UpdateOrderInterface {
  quantity?: number;
  state?: string;
}

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty({ type: () => Item })
  @ManyToOne(() => Item, (item) => item.orders, {
    onDelete: 'CASCADE',
  })
  item: Item;

  constructor(quantity: number, state: string) {
    this.quantity = quantity;
    this.state = state;
  }

  setValues(values: UpdateOrderInterface): void {
    if (values.quantity) {
      this.quantity = values.quantity;
    }

    if (values.state) {
      this.state = values.state;
    }
  }
}
