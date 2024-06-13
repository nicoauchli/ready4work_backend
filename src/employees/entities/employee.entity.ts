import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Todo} from "../../todos/entities/todo.entity";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @OneToMany(() => Todo, todo => todo.employee)
    todos: Todo[];
}
