import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DepartmentModel } from '../../../domain/models/department';
import { CostCenter } from './CostCenter';


@Entity({
  name: 'departments'
})
export class Department implements DepartmentModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'cost_center_id', nullable: false })
  costCenterId: number;
    
  @ManyToOne(() => CostCenter, costCenter => costCenter.id, {
      eager: true
  })
  @JoinColumn({ name: 'cost_center_id' })
  costCenter: CostCenter;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null, nullable: true, type: 'timestamp without time zone' })
  updatedAt: Date;

}
