import { NextFunction, Response } from "express";
import { IUserIdInRequest } from "../interfaces/interfaces";
import { AppDataSource } from "../data-source";
import { PostEntity } from "../entity/Post";

export class FileController {
	private postRepository = AppDataSource.getRepository(PostEntity);

	async addFile(request: IUserIdInRequest, response: Response, next: NextFunction) {
		const { postId } = request.body;

		let filedata = request.file;
		if (!filedata) {
			response.send("File upload error");
		} else {
			const imageUrl = filedata.filename;

			const isSuccess = await this.postRepository.update(postId, { imageUrl });

			return isSuccess.affected
				? {
						success: true,
						imageUrl: filedata.filename,
				  }
				: "file added to post";
		}
	}
}
