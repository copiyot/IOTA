import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  exports: [TypeOrmModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
