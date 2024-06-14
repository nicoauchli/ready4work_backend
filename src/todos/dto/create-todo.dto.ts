import { ApiProperty } from '@nestjs/swagger';
import { STATE } from '../../enums/State';
import { TYPE } from '../../enums/Type';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the todo',
  })
  description: string;

  @ApiProperty({
    description: 'Type of the todo',
  })
  type: TYPE;

  @ApiProperty({
    description: 'State of the todo: todo | in arbeit | wartend | done',
  })
  state: STATE;

  @ApiProperty({
    description: 'ID of employee the todo belongs to',
  })
  employee_id: number;
}
