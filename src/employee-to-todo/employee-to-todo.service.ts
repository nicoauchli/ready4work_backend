import { Injectable } from '@nestjs/common';
import { CreateEmployeeToTodoDto } from './dto/create-employee-to-todo.dto';
import { UpdateEmployeeToTodoDto } from './dto/update-employee-to-todo.dto';

@Injectable()
export class EmployeeToTodoService {
  create(createEmployeeToTodoDto: CreateEmployeeToTodoDto) {
    return 'This action adds a new employeeToTodo';
  }

  findAll() {
    return `This action returns all employeeToTodo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeToTodo`;
  }

  update(id: number, updateEmployeeToTodoDto: UpdateEmployeeToTodoDto) {
    return `This action updates a #${id} employeeToTodo`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeToTodo`;
  }
}
