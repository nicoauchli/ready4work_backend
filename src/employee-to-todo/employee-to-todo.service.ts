import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeToTodoDto } from './dto/create-employee-to-todo.dto';
import { UpdateEmployeeToTodoDto } from './dto/update-employee-to-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeToTodo } from './entities/employee-to-todo.entity';
import { Repository } from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class EmployeeToTodoService {
  constructor(
    @InjectRepository(EmployeeToTodo)
    private employeeToTodoRepository: Repository<EmployeeToTodo>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  async create(createEmployeeToTodoDto: CreateEmployeeToTodoDto) {
    const employee = await this.employeeRepository.findOne({ where: {id: createEmployeeToTodoDto.employeeId}});
    const todo = await this.todoRepository.findOne( { where: { id: createEmployeeToTodoDto.todoId}});

    if (!employee || !todo) {
      throw new Error('Employee or Todo not found');
    }
    const employeeTodo = this.employeeToTodoRepository.create({
      ...createEmployeeToTodoDto,
      employee,
      todo,
    });
    return await this.employeeToTodoRepository.save(employeeTodo);
  }

  findAll() {
    return this.employeeToTodoRepository.find(
      { relations: ['employee', 'todo'] },
    );
  }

  async findOne(id: number): Promise<EmployeeToTodo> {
    const employeeToTodo = await this.employeeToTodoRepository.findOne({where: {id: id}, relations: ['employee', 'todo']});
    if (!employeeToTodo) {
      throw new NotFoundException(`EmployeeToTodo with ID ${id} not found`);
    }
    return employeeToTodo;
  }

  async update(id: number, updateEmployeeToTodoDto: UpdateEmployeeToTodoDto): Promise<EmployeeToTodo> {
    const employeeToTodo = await this.employeeToTodoRepository.preload({
      id,
      ...updateEmployeeToTodoDto,
    });

    if (!employeeToTodo) {
      throw new NotFoundException(`EmployeeToTodo with ID ${id} not found`);
    }

    return this.employeeToTodoRepository.save(employeeToTodo);
  }

  async updateEmployeeChecklistTodos(id: number): Promise<EmployeeToTodo[]> {
    const allDefaultTodos: Todo[] = await this.todoRepository.findBy({ isDefault: true });
    const employeeDefaultTodos: EmployeeToTodo[] = await this.employeeToTodoRepository.find({
      where: { employee: { id }, todo: { isDefault: true } },
      relations: ['todo'],
    });
    const missingTodos = allDefaultTodos.filter(defaultTodo =>
      !employeeDefaultTodos.some(employeeTodo => employeeTodo.todo.id === defaultTodo.id)
    );
    const newEmployeeTodos = missingTodos.map(todo => this.employeeToTodoRepository.create({
      employee: { id },
      todo,
      state: 'todo',
      description: '',
    }));

    await this.employeeToTodoRepository.save(newEmployeeTodos);

    return await this.employeeToTodoRepository.find({
      where: { employee: { id } },
      relations: ['todo'],
    });
  }

  async remove(id: number): Promise<void> {
    const employeeToTodo = await this.findOne(id);
    await this.employeeToTodoRepository.remove(employeeToTodo);
  }
}
