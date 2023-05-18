import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entity/User";
import { UserController } from "./UserController";

export class AuthController {
	private userRepository = AppDataSource.getRepository(UserEntity);

	async login(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const user = await this.userRepository.findOne({
			where: { id },
		});

		if (!user) {
			return "unregistered user";
		}
		return user;
	}

	async signup(request: Request, response: Response, next: NextFunction) {
		const { firstName, lastName, email, password, posts } = request.body;

		const isUserExist = await new UserController().findByEmail(email);
		if (isUserExist === "unregistered user") {
			return "user with this email already exists";
		}

		const user = Object.assign(new UserEntity(), {
			firstName,
			lastName,
			email,
			password,
			posts,
		});

		return this.userRepository.save(user);
	}
}
