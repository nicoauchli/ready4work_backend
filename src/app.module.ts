import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "./employees/entities/employee.entity";

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
        entities: [Employee],
        synchronize: true,
      })
  ],
})
export class AppModule {}
