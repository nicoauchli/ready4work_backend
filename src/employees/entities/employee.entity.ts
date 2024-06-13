import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
}
