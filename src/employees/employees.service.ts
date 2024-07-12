import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository, UpdateResult } from 'typeorm';
import { EmployeeWithTodos } from './interfaces/employeeWithTodo.interface';
import { Todo } from '../todos/entities/todo.entity';
import { EmployeeToTodo } from '../employee-to-todo/entities/employee-to-todo.entity';
import { UpdateTodoDto } from '../todos/dto/update-todo.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(EmployeeToTodo)
    private readonly employeeToTodoRepository: Repository<EmployeeToTodo>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    await this.employeeRepository.save(employee);

    const defaultTodos: Todo[] = await this.todoRepository.find({ where: { isDefault: true } });

    const employeeToTodos = defaultTodos.map(todo => {
      const employeeToTodo = new EmployeeToTodo();
      employeeToTodo.employee = employee;
      employeeToTodo.todo = todo;
      employeeToTodo.state = 'todo';
      employeeToTodo.description = '';
      return employeeToTodo;
    });

    await this.employeeToTodoRepository.save(employeeToTodos);

    return employee;
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {id}
    });
    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(updateEmployeeDto);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async findOneWithTodos(id: number): Promise<EmployeeWithTodos> {
    const employee = await this.employeeRepository.findOne({ where: {id}, relations: ['employeeToTodo.todo']});
  if (!employee) {
    throw new NotFoundException(`Employee with ID ${id} not found`)
    }
    const { employeeToTodo, ...rest } = employee;

    return {
      ...rest,
      todos: employeeToTodo,
    } as EmployeeWithTodos;

  }
}
