import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeToTodoDto {
  @ApiProperty({
    description: '',
  })
  employeedId: number;

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
