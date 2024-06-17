import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inventory } from './Inventories';
import { Minifig } from './Minifigs';

@Entity({ name: "inventory_minifigs" })
export class InventoryMinifigs {
  @PrimaryColumn({ name: "inventory_id" })
  inventoryId: number;

  @PrimaryColumn({ name: "fig_num" })
  figNum: string;

  @Column({ name: "quantity", nullable: true })
  quantity: string

  @ManyToOne(() => Inventory, inventory => inventory.minifigs)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @ManyToOne(() => Minifig, minifig => minifig.inventories)
  @JoinColumn({ name: 'fig_num' })
  minifig: Minifig;

}
