import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { ItemsModule } from '../items/items.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [ItemsModule, InventoryModule, TypeOrmModule.forFeature([Order])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
