import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeToTodo } from '../../employee-to-todo/entities/employee-to-todo.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  isDefault: boolean;

  @Column('simple-array')
  content: string[];

  @OneToMany(() => EmployeeToTodo, (employeeToTodo) => employeeToTodo.todo, { cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
  public employeeToTodo: EmployeeToTodo[];
}
