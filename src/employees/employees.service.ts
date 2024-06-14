import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';
import { CreateTodoDto } from "../todos/dto/create-todo.dto";
import { STATE } from "../enums/State";
import { TYPE } from "../enums/Type";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  private readonly defaultTodos: CreateTodoDto[] = [
    { title: 'Brief 1. Arbeitstag', description: "", type: TYPE.MAIL, state: STATE.TODO, employee_id: 0 },
    { title: 'Einführung 1. Woche', description: "", type: TYPE.MAIL, state: STATE.TODO, employee_id: 0 },
  ];

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    const savedEmployee = await this.employeeRepository.save(employee);

    const todos = this.defaultTodos.map((todo: CreateTodoDto) => {
      return this.todoRepository.create({
        ...todo,
        employee: savedEmployee,
      });
    });
    await this.todoRepository.save(todos);
    return savedEmployee;
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['todos'],
    });
  }

  update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<UpdateResult> {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
