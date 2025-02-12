/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { userRole } from "../enum/user.role.enum";
import { Todo } from "src/todo/entities/todo.entity";

/* eslint-disable prettier/prettier */
@Entity()

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.user
    })
    role: userRole;

    @OneToMany(() => Todo, (todo) => todo.user)
    todo: Todo
}
