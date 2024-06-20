import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeToTodoService } from './employee-to-todo.service';
import { CreateEmployeeToTodoDto } from './dto/create-employee-to-todo.dto';
import { UpdateEmployeeToTodoDto } from './dto/update-employee-to-todo.dto';

@Controller('employee-to-todo')
export class EmployeeToTodoController {
  constructor(private readonly employeeToTodoService: EmployeeToTodoService) {}

  @Post()
  create(@Body() createEmployeeToTodoDto: CreateEmployeeToTodoDto) {
    return this.employeeToTodoService.create(createEmployeeToTodoDto);
  }

  @Get()
  findAll() {
    return this.employeeToTodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeToTodoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeToTodoDto: UpdateEmployeeToTodoDto) {
    return this.employeeToTodoService.update(+id, updateEmployeeToTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeToTodoService.remove(+id);
  }
}
