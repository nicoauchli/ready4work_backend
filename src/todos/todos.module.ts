import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeToTodo } from '../entities/employeeToTodo';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [TypeOrmModule.forFeature([Todo, Employee, EmployeeToTodo])],
  exports: [TypeOrmModule],
})
export class TodosModule {}
