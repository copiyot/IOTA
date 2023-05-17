import * as Zod from 'zod';

export const itemSchema = Zod.object({
  name: Zod.string(),
  price: Zod.number(),
});

export const createOrdersSchema = Zod.object({
  state: Zod.string(),
  quantity: Zod.number(),
  itemId: Zod.number(),
});

export const updateOrdersSchema = Zod.object({
  state: Zod.string().optional(),
  quantity: Zod.number().optional(),
  itemId: Zod.number(),
});

export const inventorySchema = Zod.object({
  quantity: Zod.number(),
  itemId: Zod.number(),
});
