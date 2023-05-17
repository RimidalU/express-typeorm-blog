import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { UserEntity } from "./User";

@Entity()
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	description: string;

	@Column()
	imageUrl: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	@ManyToOne(() => UserEntity, (user) => user.posts)
	user: UserEntity;
}
