import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository, UpdateResult } from 'typeorm';
import { EmployeeWithTodos } from './interfaces/employeeWithTodo.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { id },
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
