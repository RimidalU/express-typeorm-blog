import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as multer from 'multer'

import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
// import { UserEntity } from "./entity/User";
// import { PostEntity } from "./entity/Post";
import checkAuth from "./utils/checkAuth";
import { filesStorage } from "./utils/storage";
import * as swaggerDocument from "./swagger.json";

const upload = multer({ storage: filesStorage });

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(cors());
		app.use(bodyParser.json());

		app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				route.checkAuth ? checkAuth : [],
				route.uploads ? upload.single('upload') : [],
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[route.action](req, res, next);
					if (result instanceof Promise) {
						result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				}
			);
		});

		// setup express app here
		// ...

		// start express server
		app.listen(3000);

		// insert new users for test
		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(UserEntity, {
		// 		firstName: "Timber",
		// 		lastName: "Saw",
		// 		email: "timber@fsfg.rt",
		// 		password: "12345",
		// 		posts: [],
		// 	})
		// );

		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(UserEntity, {
		// 		firstName: "Phantom",
		// 		lastName: "Assassin",
		// 		email: "phantom@fsfg.rt",
		// 		password: "12345",
		// 		posts: [],
		// 	})
		// );

		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(PostEntity, {
		// 		content: "TimberTimberTimberTimberTimberTimberTimberTimberTimberTimberTimberTimberTimberTimber",
		// 		imageUrl: "",
		// 		createdAt: new Date(Date.now()),
		// 		updatedAt: new Date(Date.now()),
		// 	})
		// );

		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(PostEntity, {
		// 		content: "PhantoPhantomPhantomPhantomPhantomPhantomPhantomPhantomPhantomPhantomPhantomPhantomm",
		// 		imageUrl: "",
		// 		createdAt: new Date(Date.now()),
		// 		updatedAt: new Date(Date.now()),
		// 	})
		// );

		console.log(
			"Express server has started on port 3000. Open http://localhost:3000/users to see results"
		);
	})
	.catch((error) => console.log(error));
