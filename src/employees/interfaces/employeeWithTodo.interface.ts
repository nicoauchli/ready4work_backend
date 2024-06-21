import { EmployeeToTodo } from '../../employee-to-todo/entities/employee-to-todo.entity';
import { Employee } from '../entities/employee.entity';

export interface EmployeeWithTodos extends Employee {
  todos: EmployeeToTodo[];
}