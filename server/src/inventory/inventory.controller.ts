import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Inventory } from './inventory.entity';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { inventorySchema } from '../validationSchemas';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiCreatedResponse({ type: Inventory })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const validation = inventorySchema.safeParse(createInventoryDto);
    if (validation.success === false)
      throw new BadRequestException([...validation.error.errors]);
    return this.inventoryService.addInventory(createInventoryDto);
  }

  @ApiCreatedResponse({ type: Inventory })
  @ApiBadRequestResponse()
  @Put(':id')
  update(
    @Body() updateInventoryDto: CreateInventoryDto,
    @Param('id') id,
  ): Promise<Inventory> {
    const validation = inventorySchema.safeParse(updateInventoryDto);
    if (validation.success === false)
      throw new BadRequestException([...validation.error.errors]);
    return this.inventoryService.updateInventory(id, updateInventoryDto);
  }

  @ApiOkResponse({ type: Inventory })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id): Promise<Inventory> {
    return this.inventoryService.getInventory(id);
  }

  @ApiOkResponse({ type: Inventory, isArray: true })
  @Get()
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.getInventories();
  }
}
