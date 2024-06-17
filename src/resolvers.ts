import { AppDataSource } from "./data-source";
import { InventoryMinifigs } from "./entities/InventoryMinifigs";
import { Minifig } from "./entities/Minifigs";

const getMinifigs = (parent, args, context, info) => {
  const minifigsRepository = AppDataSource.getRepository(Minifig);
  return minifigsRepository.find()
}

const getMinifig = (parent, args, context, info) => {
  const { figNum } = args
  const minifigsRepository = AppDataSource.getRepository(Minifig);
  return minifigsRepository.findOneBy({ figNum })
}

const inventories = async (parent) => {
  const inventoryMinifigsRepository = AppDataSource.getRepository(InventoryMinifigs);

  const data = await inventoryMinifigsRepository
    .createQueryBuilder("inventory_minifigs")
    .where('inventory_minifigs.figNum = :figNum', { figNum: parent.figNum })
    .leftJoinAndSelect('inventory_minifigs.inventory', "inventory")
    .getMany();

  return data.map(b => b.inventory)
}

export const resolvers = {
  Query: {
    getMinifigs,
    getMinifig,
  },
  Minifig: {
    inventories,
  }
};
