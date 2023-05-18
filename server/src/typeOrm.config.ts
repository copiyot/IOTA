import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import { __prod__ } from './constants';
import { Item } from './items/items.entity';
import { Order } from './orders/orders.entity';
import { Inventory } from './inventory/inventory.entity';

const typeOrmConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'SupplyChainDB',
  entities: [Item, Order, Inventory],
  synchronize: __prod__,
  logging: __prod__,
};

export default typeOrmConfig;
