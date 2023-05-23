import { validate } from "class-validator";

import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PostEntity } from "../entity/Post";

import { IUserIdInRequest } from "../interfaces/interfaces";

export class PostController {
	private postRepository = AppDataSource.getRepository(PostEntity);

	async all(request: Request, response: Response, next: NextFunction) {
		const { limit = 20, offset = 0 } = request.query;

		const users = await AppDataSource.getRepository(PostEntity)
			.createQueryBuilder("post")
			.leftJoinAndSelect("post.owner", "owner")
			.select(["post", "owner.id", "owner.firstName", "owner.lastName"])
			.skip(+offset)
			.take(+limit)
			.getMany();

		return users;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const post = await AppDataSource.getRepository(PostEntity)
			.createQueryBuilder("post")
			.where("post.id = :id", { id })
			.leftJoinAndSelect("post.owner", "owner")
			.select(["post", "owner.id", "owner.firstName", "owner.lastName"])
			.getOne();

		if (!post) {
			return "unregistered post";
		}
		return post;
	}

	async save(request: IUserIdInRequest, response: Response, next: NextFunction) {
		const userId = request.userId;

		const { content, imageUrl } = request.body;

		const post = Object.assign(new PostEntity(), {
			content,
			imageUrl,
			owner: { id: userId },
		});
		const errors = await validate(post);
		if (errors.length > 0) {
			return errors[0].constraints;
		} else {
			return response.send(await this.postRepository.save(post));
		}
	}

	async update(request: IUserIdInRequest, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const userId = request.userId;
		const { content, imageUrl } = request.body;

		const currentPost = await this.postRepository.findOne({
			where: { id },
			relations: ["owner"],
		});

		if (userId !== currentPost.owner.id) {
			return "no access";
		}

		const newPost = await this.postRepository.update(id, {
			content,
			imageUrl,
		});
		return newPost.affected ? "post has been updated" : "this post not updated";
	}

	async remove(request: IUserIdInRequest, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const userId = request.userId;

		let postToRemove = await this.postRepository.findOneBy({ id });

		if (!postToRemove) {
			return "this post not exist";
		}

		if (userId !== postToRemove.owner.id) {
			return "no access";
		}

		await this.postRepository.remove(postToRemove);

		return "post has been removed";
	}
}
