import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

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
      entities: [Employee, Todo],
      synchronize: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
