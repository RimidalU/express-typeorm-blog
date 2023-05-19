import { Request } from "express";

export interface IJwtPayload {
	id: string;
	email: string;
}

export interface IUserIdInRequest extends Request {
	userId: number
  }