import { Inventory } from '../inventory/inventory.entity';
import { Order } from '../orders/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

interface UpdateItemInterface {
  name?: string;
  price?: number;
}

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (order) => order.item)
  orders: Order[];

  @OneToOne(() => Inventory, (inventory) => inventory.item)
  itemInfo: Item;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  setValues(values: UpdateItemInterface): void {
    if (values.name) {
      this.name = values.name;
    }

    if (values.price) {
      this.price = values.price;
    }
  }
}
