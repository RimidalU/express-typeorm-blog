import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { UserEntity } from "./User";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

@Entity()
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty()
	@IsString()
	@MinLength(5, {
		message: "Post is too short",
	})
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
