import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';
import { EmployeeToTodoModule } from './employee-to-todo/employee-to-todo.module';
import { EmployeeToTodo } from './employee-to-todo/entities/employee-to-todo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Lädt die Umgebungsvariablen aus der .env-Datei
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        url: configService.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        entities: [Employee, Todo, EmployeeToTodo],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    EmployeesModule,
    TodosModule,
    EmployeeToTodoModule,
  ],
})
export class AppModule {}
