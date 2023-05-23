import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";

import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entity/User";

export class AuthController {
	private userRepository = AppDataSource.getRepository(UserEntity);

	async login(request: Request, response: Response, next: NextFunction) {
		const { email, password } = request.body;

		const user = await this.userRepository.findOne({
			where: { email },
		});

		if (!user) {
			return "unregistered user";
		}

		const isValidUser = await bcrypt.compare(password, user.password);

		if (!isValidUser) {
			return "unregistered user";
		}

		const token = jwt.sign(
			{
				email: email,
				id: user.id,
			},
			process.env.SECRET_KEY
		);
		return {
			success: true,
			token,
		};
	}

	async signup(request: Request, response: Response, next: NextFunction) {
		const { firstName, lastName, email, password, posts } = request.body;

		if (password.length < 5) {
			return "Password is too short (min 5 symbols)";
			next();
		}

		const isUserExist = await this.userRepository.findOne({
			where: { email },
		});

		if (isUserExist) {
			return "user with this email already exists";
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const user = Object.assign(new UserEntity(), {
			firstName,
			lastName,
			email,
			password: passwordHash,
			posts: [],
		});

		const errors = await validate(user);
		if (errors.length > 0) {
			return errors[0].constraints;
		} else {
			this.userRepository.save(user);
			const token = jwt.sign(
				{
					email: email,
					id: user.id,
				},
				process.env.SECRET_KEY
			);
			return {
				success: true,
				token,
			};
		}
	}
}
