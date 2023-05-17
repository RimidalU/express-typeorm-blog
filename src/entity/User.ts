import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
    OneToMany,
} from "typeorm";
import { PostEntity } from "./Post";

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[];
}
