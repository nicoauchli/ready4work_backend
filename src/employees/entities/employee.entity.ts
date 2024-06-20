import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeToTodo } from '../../employee-to-todo/entities/employee-to-todo.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(() => EmployeeToTodo, (employeeToTodo) => employeeToTodo.employee)
  public employeeToTodo: EmployeeToTodo[];
}
