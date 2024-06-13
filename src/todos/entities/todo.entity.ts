import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "../../employees/entities/employee.entity";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    type: string;

    @Column()
    state: string

    @ManyToOne(() => Employee, employee => employee.todos,
        {cascade: true})
    employee: Employee;
}


