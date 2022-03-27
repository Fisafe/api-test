import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { UserModel } from '../../../domain/models/user';
import { Department } from './Department';
import { Position } from './Position';

@Entity({
    name: 'users'
})
export class User implements UserModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_name', unique: true })
    userName: string;

    @Column()
    password: string;

    @Column({ name: 'department_id', nullable: true })
    departmentId: number;
      
    @ManyToOne(() => Department, department => department.id, {
        eager: true
    })
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @Column({ name: 'position_id', nullable: true })
    positionId: number;
      
    @ManyToOne(() => Position, position => position.id, {
        eager: true
    })
    @JoinColumn({ name: 'position_id' })
    position: Position;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', default: null, nullable: true, type: 'timestamp without time zone' })
    updatedAt: Date;

}
