import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const employee = await this.employeeRepository.findOne({
      where: { id: createTodoDto.employee_id },
    });
    if (!employee) {
      throw new Error('Employee not found');
    }

    const todo = this.todoRepository.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
      type: createTodoDto.type,
      state: createTodoDto.state,
      employee: employee,
    });

    return this.todoRepository.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: ['employee'] });
  }

  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!todo) {
      throw new Error('Todo not found');
    }

    if (updateTodoDto.employee_id) {
      const employee = await this.employeeRepository.findOne({ where: { id: updateTodoDto.employee_id } });
      if (!employee) {
        throw new Error('Employee not found');
      }
      todo.employee = employee;
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
