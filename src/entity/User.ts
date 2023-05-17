import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEntity } from "./Post";
import { IsArray, IsEmail, IsNotEmpty } from "class-validator";
import { IsStrongPassword } from "class-validator";
import { MinLength } from "class-validator";

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@MinLength(3, {
		message: "First name is too short",
	})
	firstName: string;

	@Column()
	@MinLength(3, {
		message: "Last name is too short",
	})
	lastName: string;

	@Column({ unique: true })
	@IsEmail({}, { message: "Incorrect email" })
	@IsNotEmpty({ message: "The email is required" })
	email: string;

	@Column()
	@IsStrongPassword({ minLength: 5 },  {
		message: "Password is too short (min 5 symbols)",
	})
	password: string;

	@OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    @IsArray()
	posts: PostEntity[];
}
