import {ApiProperty} from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty({
        description: "Firstname of employee"
    })
    firstname: string

    @ApiProperty({
        description: "Lastname of employee",
    })
    lastname: string
}
