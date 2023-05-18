import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PostEntity } from "../entity/Post";

export class PostController {
	private postRepository = AppDataSource.getRepository(PostEntity);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.postRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const post = await this.postRepository.findOne({
			where: { id },
		});

		if (!post) {
			return "unregistered post";
		}
		return post;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { description, imageUrl, createdDate, updatedDate } = request.body;

		const post = Object.assign(new PostEntity(), {
			description,
			imageUrl,
			createdDate,
			updatedDate,
		});

		return this.postRepository.save(post);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let postToRemove = await this.postRepository.findOneBy({ id });

		if (!postToRemove) {
			return "this post not exist";
		}

		await this.postRepository.remove(postToRemove);

		return "post has been removed";
	}
}
