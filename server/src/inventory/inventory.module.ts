import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [ItemsModule, TypeOrmModule.forFeature([Inventory])],
  exports: [TypeOrmModule],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
