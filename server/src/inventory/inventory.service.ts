import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from './inventory.entity';
import { Item } from '../items/items.entity';

interface InventoryInterface {
  id?: number;
  itemId?: number;
  quantity?: number;
}

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async addInventory(inventory: InventoryInterface): Promise<Inventory> {
    const newInventory = await this.inventoryRepository.create(inventory);
    const id = inventory.itemId;
    const item = await this.itemsRepository.findOne({ where: { id } });
    newInventory.item = item;
    return await this.inventoryRepository.save(newInventory);
  }

  async getInventory(id: number): Promise<Inventory> {
    return await this.inventoryRepository.findOne({ where: { id } });
  }

  async updateInventory(
    id: number,
    inventoryUpdate: InventoryInterface,
  ): Promise<Inventory> {
    const inventoryToUpdate = await this.getInventory(id);
    inventoryToUpdate.setQuantity(inventoryUpdate.quantity);
    return this.inventoryRepository.save(inventoryToUpdate);
  }

  async getInventories(): Promise<Inventory[]> {
    return await this.inventoryRepository.find();
  }
}
