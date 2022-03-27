import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
} from 'typeorm';
import { CostCenterModel } from '../../../domain/models/costCenter';
import { CostCenterCategory } from '../../../domain/types/costCenterCategory';
import { CostCenterType } from '../../../domain/types/costCenterType';


@Entity({
  name: 'cost_centers'
})
export class CostCenter implements CostCenterModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: CostCenterCategory, nullable: false })
  category: CostCenterCategory;

  @Column({ type: 'enum', enum: CostCenterType, nullable: false })
  type: CostCenterType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null, nullable: true, type: 'timestamp without time zone' })
  updatedAt: Date;

}
