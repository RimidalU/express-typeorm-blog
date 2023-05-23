import { IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";

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
	@IsNotEmpty()
	@IsString()
	@MinLength(5, {
		message: "Post is too short",
	})
	content: string;

	@Column()
	@IsUrl()
	imageUrl: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.posts)
	owner: UserEntity;
}
