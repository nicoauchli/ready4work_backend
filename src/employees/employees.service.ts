import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./entities/employee.entity";
import {Repository, UpdateResult} from "typeorm";

@Injectable()
export class EmployeesService {

  constructor(
      @InjectRepository(Employee)
      private employeeRepository: Repository<Employee>,
  ) { }

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({id});
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateResult> {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
