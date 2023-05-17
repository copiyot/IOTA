import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Item } from './items.entity';

interface ItemInterface {
  id?: number;
  name?: string;
  price?: number;
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async addItem(item: ItemInterface): Promise<Item> {
    const newItem = await this.itemsRepository.create(item);
    return await this.itemsRepository.save(newItem);
  }

  async updateItem(id: number, item: ItemInterface): Promise<Item> {
    const itemToUpdate = await this.getItem(id);
    itemToUpdate.setValues(item);
    return await this.itemsRepository.save(itemToUpdate);
  }

  async getItem(id: number): Promise<Item> {
    return await this.itemsRepository.findOne({ where: { id } });
  }

  async deleteItem(id: number): Promise<DeleteResult> {
    return await this.itemsRepository.delete(id);
  }

  async getItems(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }
}
