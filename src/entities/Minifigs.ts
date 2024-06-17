import { Entity, PrimaryColumn, Column, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventories';


@Entity({ name: "minifigs" })
export class Minifig {
  @PrimaryColumn({ name: "fig_num" })
  figNum: string;

  @Column()
  name: string;

  @Column({ name: "num_parts" })
  numParts: string;

  @Column({ name: "img_url" })
  imgURL: string;

  @ManyToMany(() => Inventory, inventory => inventory.minifigs)
  inventories: Inventory[];
}
