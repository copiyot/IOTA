import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Item } from './items.entity';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { DeleteResult } from 'typeorm';
import { itemSchema } from '../validationSchemas';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOkResponse({ type: Item, isArray: true })
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.getItems();
  }

  @ApiOkResponse({ type: Item })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    return this.itemsService.getItem(id);
  }

  @ApiCreatedResponse({ type: Item })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    const validation = itemSchema.safeParse(createItemDto);
    if (validation.success === false)
      throw new BadRequestException([...validation.error.errors]);
    return this.itemsService.addItem(createItemDto);
  }

  @ApiCreatedResponse({ type: Item })
  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.itemsService.deleteItem(id);
  }
}
