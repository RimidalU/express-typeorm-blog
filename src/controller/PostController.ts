import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PostEntity } from "../entity/Post";
import { IUserIdInRequest } from "../interfaces/interfaces";

export class PostController {
	private postRepository = AppDataSource.getRepository(PostEntity);

	async all(request: Request, response: Response, next: NextFunction) {
		return response.send(this.postRepository.find());
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const post = await this.postRepository.findOne({
			where: { id },
			relations: ["owner"],
		});

		if (!post) {
			return "unregistered post";
		}
		const ownerName = `${post.owner.firstName} ${post.owner.lastName}`;

		return { ...post, owner: ownerName };
	}

	async save(request: IUserIdInRequest, response: Response, next: NextFunction) {
		const userId = request.userId;

		const { content, imageUrl } = request.body;

		const post = Object.assign(new PostEntity(), {
			content,
			imageUrl,
			owner: { id: userId },
		});

		return response.send(await this.postRepository.save(post));
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const { content, imageUrl } = request.body;

		const newPost = await this.postRepository.update(id, {
			content,
			imageUrl,
		});
		return newPost.affected ? "post has been updated" : "this post not updated";
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
