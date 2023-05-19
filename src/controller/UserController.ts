import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entity/User";

export class UserController {
	private userRepository = AppDataSource.getRepository(UserEntity);

	// async all(request: Request, response: Response, next: NextFunction) {
	// 	return await this.userRepository.find();
	// }

	async one(request: Request, response: Response, next: NextFunction) {
		const userId = parseInt(request.params.id);

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});

		if (!user) {
			return "unregistered user";
		}
		const { id, firstName, lastName } = user;
		return {
			id,
			firstName,
			lastName,
		};
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
		});

		if (!user) {
			return "unregistered user";
		}
		return user;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { firstName, lastName, email, password } = request.body;

		const isUserExist = await this.findByEmail(email);
		if (isUserExist === "unregistered user") {
			return "user with this email already exists";
		}

		const user = Object.assign(new UserEntity(), {
			firstName,
			lastName,
			email,
			password,
		});

		return this.userRepository.save(user);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const { firstName, lastName, password } = request.body;

		const newUser = await this.userRepository.update(id, {
			firstName,
			lastName,
			password,
		});
		return newUser.affected ? "user has been updated" : "this user not updated";
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let userToRemove = await this.userRepository.findOneBy({ id });

		if (!userToRemove) {
			return "this user not exist";
		}

		await this.userRepository.remove(userToRemove);

		return "user has been removed";
	}
}
