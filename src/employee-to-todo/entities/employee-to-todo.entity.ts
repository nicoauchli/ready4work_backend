import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Todo } from '../../todos/entities/todo.entity';

@Entity()
export class EmployeeToTodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  todoId: number;

  @Column()
  state: string;

  @Column()
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeToTodo,{ onDelete: 'CASCADE' })
  employee: Employee;

  @ManyToOne(() => Todo, (todo) => todo.employeeToTodo, {onDelete: 'CASCADE'})
  todo: Todo;
}
