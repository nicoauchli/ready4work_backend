import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoStateDto {
  @ApiProperty({ description: 'Update the state of a todo' })
  state: string;
}
