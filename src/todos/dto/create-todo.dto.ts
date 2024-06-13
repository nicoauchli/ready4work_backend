import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({
        description: "Title of the todo"
    })
    title: string

    @ApiProperty({
        description: "Description of the todo"
    })
    description: string

    @ApiProperty({
        description: "Type of the todo"
    })
    type: string

    @ApiProperty({
        description: "State of the todo: todo | in arbeit | wartend | done"
    })
    state: string

    @ApiProperty({
        description: "ID of employee the todo belongs to"
    })
    employeeId: number;

}
