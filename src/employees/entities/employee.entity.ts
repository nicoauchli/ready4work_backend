import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeToTodo } from '../../entities/employeeToTodo';

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
