import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Todo } from '../todos/entities/todo.entity';
import { EmployeeToTodo } from '../employee-to-todo/entities/employee-to-todo.entity';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [TypeOrmModule.forFeature([Employee, Todo, EmployeeToTodo])],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}
