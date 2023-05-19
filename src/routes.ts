import { UserController } from "./controller/UserController";
import { PostController } from "./controller/PostController";
import { AuthController } from "./controller/AuthController";

export const Routes = [
	//auth
	{
		method: "post",
		route: "/auth/login",
		controller: AuthController,
		action: "login",
	},
	{
		method: "post",
		route: "/auth/signup",
		controller: AuthController,
		action: "signup",
	},
	//users
	{
		method: "get",
		route: "/users",
		controller: UserController,
		action: "all",
	},
	{
		method: "get",
		route: "/users/:id",
		controller: UserController,
		action: "one",
	},
	{
		method: "post",
		route: "/users",
		controller: UserController,
		action: "save",
	},
	{
		method: "patch",
		route: "/users/:id",
		controller: UserController,
		action: "update",
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
	},
	//posts
	{
		method: "get",
		route: "/posts",
		controller: PostController,
		action: "all",
	},
	{
		method: "get",
		route: "/posts/:id",
		controller: PostController,
		action: "one",
	},
	{
		method: "post",
		route: "/posts",
		controller: PostController,
		action: "save",
	},
	{
		method: "patch",
		route: "/posts/:id",
		controller: PostController,
		action: "update",
	},
	{
		method: "delete",
		route: "/posts/:id",
		controller: PostController,
		action: "remove",
	},
];
