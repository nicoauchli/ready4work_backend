import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeToTodoDto {
  @ApiProperty({
    description: '',
  })
  employeeId: number;

  @ApiProperty({
    description: '',
  })
  todoId: number;

  @ApiProperty({
    description: '',
  })
  state: string;

  @ApiProperty({
    description: '',
  })
  description: string;
}
