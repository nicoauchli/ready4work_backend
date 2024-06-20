import { Module } from '@nestjs/common';
import { EmployeeToTodoService } from './employee-to-todo.service';
import { EmployeeToTodoController } from './employee-to-todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Todo } from '../todos/entities/todo.entity';
import { EmployeeToTodo } from './entities/employee-to-todo.entity';

@Module({
  controllers: [EmployeeToTodoController],
  providers: [EmployeeToTodoService],
  imports: [TypeOrmModule.forFeature([Employee, Todo, EmployeeToTodo])],
  exports: [TypeOrmModule],
})
export class EmployeeToTodoModule {}
