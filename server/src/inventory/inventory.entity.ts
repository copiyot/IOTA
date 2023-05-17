import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../items/items.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  itemId: number;

  @OneToOne(() => Item, (item) => item.itemInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  item: Item;

  constructor(quantity: number) {
    this.quantity = quantity;
  }

  setQuantity(quantity: number): void {
    this.quantity = this.quantity + quantity;
  }
}
