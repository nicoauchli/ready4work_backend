import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeToTodo } from '../../entities/employeeToTodo';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  type: string;

  @Column()
  isDefault: boolean;

  @Column('simple-array')
  content: string[];

  @OneToMany(() => EmployeeToTodo, (employeeToTodo) => employeeToTodo.todo)
  public employeeToTodo: EmployeeToTodo[];
}
