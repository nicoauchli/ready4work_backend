import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';
import { EmployeeToTodoModule } from './employee-to-todo/employee-to-todo.module';
import { EmployeeToTodo } from './employee-to-todo/entities/employee-to-todo.entity';

@Module({
  imports: [
    EmployeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'monorail.proxy.rlwy.net',
      port: 15437,
      username: 'postgres',
      password: 'wRWSQnOQgxyUCKaxaLmTjaaEsYWtQTrA',
      database: 'railway',
      entities: [Employee, Todo, EmployeeToTodo],
      synchronize: true,
    }),
    TodosModule,
    EmployeeToTodoModule,
  ],
})
export class AppModule {}
