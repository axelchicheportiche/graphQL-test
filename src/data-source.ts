import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config";

//Entities :
import { Minifig } from "./entities/Minifigs";
import { Inventory } from "./entities/Inventories";
import { InventoryMinifigs } from "./entities/InventoryMinifigs";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: config.DATABASE_PATH,
  synchronize: true,
  logging: false,
  entities: [
    Minifig,
    Inventory,
    InventoryMinifigs
  ],
  migrations: [],
  subscribers: [],
});
