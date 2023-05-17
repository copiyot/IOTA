import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
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

import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteResult } from 'typeorm';
import { createOrdersSchema, updateOrdersSchema } from '../validationSchemas';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({ type: Order })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const validation = createOrdersSchema.safeParse(createOrderDto);
    if (validation.success === false)
      throw new BadRequestException([...validation.error.errors]);
    return this.ordersService.addOrder(createOrderDto);
  }

  @ApiCreatedResponse({ type: Order })
  @ApiBadRequestResponse()
  @Put(':id')
  update(
    @Body() updateOrderDto: CreateOrderDto,
    @Param('id') id,
  ): Promise<Order> {
    const validation = updateOrdersSchema.safeParse(updateOrderDto);
    if (validation.success === false)
      throw new BadRequestException([...validation.error.errors]);
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @ApiOkResponse({ type: Order })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @ApiOkResponse({ type: Order, isArray: true })
  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.ordersService.deleteOrder(id);
  }
}
