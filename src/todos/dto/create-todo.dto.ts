import { ApiProperty } from '@nestjs/swagger';
import { TYPE } from '../../enums/Type';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the todo',
    nullable: true,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Type of the todo',
  })
  type: TYPE;

  @ApiProperty({
    description: 'if it is a default todo',
  })
  isDefault: boolean;

  @ApiProperty({
    description: 'content of the todo',
  })
  content: string[];
}
