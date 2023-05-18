import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Order } from './orders.entity';
import { Item } from '../items/items.entity';
import { Inventory } from '../inventory/inventory.entity';

interface OderInterface {
  itemId?: number;
  quantity?: number;
  state?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async addOrder(order: OderInterface): Promise<Order> {
    const id = order.itemId;
    const itemInventory = await this.inventoryRepository.findOne({
      where: { itemId: id },
    });

    if (itemInventory === null || order.quantity > itemInventory.quantity) {
      throw new NotFoundException('Requested Item is out of stock');
    }

    itemInventory.setQuantity(-order.quantity);
    await this.inventoryRepository.save(itemInventory);

    const item = await this.itemsRepository.findOne({ where: { id } });
    const newOrder = await this.ordersRepository.create(order);
    newOrder.item = item;
    return await this.ordersRepository.save(newOrder);
  }

  async updateOrder(id: number, orderUpdate: OderInterface): Promise<Order> {
    const orderToUpdate = await this.getOrder(id);
    orderToUpdate.setValues(orderUpdate);
    return this.ordersRepository.save(orderToUpdate);
  }

  async getOrder(id: number): Promise<Order> {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        item: true,
      },
    });
  }

  async getOrders(): Promise<Order[]> {
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.item', 'item')
      .getMany();
  }

  async deleteOrder(id: number): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }
}
