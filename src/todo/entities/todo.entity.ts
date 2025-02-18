/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/* eslint-disable prettier/prettier */
@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.todo)
    user: User[]
  title: string;

    @Column()
    description: string;

    @Column()
    userId: string;

   
}



// export class CreateTodoDto {
//   title: string;
//   description?: string;
//   status?: boolean;
// }

