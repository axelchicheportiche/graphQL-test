import { Entity, PrimaryColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Minifig } from './Minifigs';

@Entity({ name: "inventories" })
export class Inventory {
  @PrimaryColumn({ name: "id" })
  id: number;

  @Column()
  version: string;

  @ManyToMany(() => Minifig, minifig => minifig.inventories)
  @JoinTable({
    name: 'inventory_minifigs',
    joinColumn: {
      name: 'inventory_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'fig_num',
      referencedColumnName: 'figNum'
    }
  })
  minifigs: Minifig[];;
}
