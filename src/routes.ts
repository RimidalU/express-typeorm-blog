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
	// {
	// 	method: "get",
	// 	route: "/users",
	// 	controller: UserController,
	// 	action: "all",
	// 	checkAuth: true
	// },
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
		checkAuth: true
	},
	{
		method: "patch",
		route: "/users/:id",
		controller: UserController,
		action: "update",
		checkAuth: true
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
		checkAuth: true
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
		checkAuth: true
	},
	{
		method: "patch",
		route: "/posts/:id",
		controller: PostController,
		action: "update",
		checkAuth: true
	},
	{
		method: "delete",
		route: "/posts/:id",
		controller: PostController,
		action: "remove",
		checkAuth: true
	},
];
