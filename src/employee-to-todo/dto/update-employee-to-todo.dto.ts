import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeToTodoDto } from './create-employee-to-todo.dto';

export class UpdateEmployeeToTodoDto extends PartialType(
  CreateEmployeeToTodoDto,
) {}
