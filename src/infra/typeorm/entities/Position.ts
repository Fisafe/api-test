import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
} from 'typeorm';
import { PositionModel } from '../../../domain/models/position';

@Entity({
  name: 'positions'
})
export class Position implements PositionModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null, nullable: true, type: 'timestamp without time zone' })
  updatedAt: Date;

}
