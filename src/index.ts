const express = require("express");
import * as bodyParser from "body-parser";
const cors = require("cors");
import * as swaggerUi from "swagger-ui-express";
const multer  = require('multer')

import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
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
		app.use("/uploads", express.static("uploads"));

		app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				route.checkAuth ? checkAuth : [],
				route.uploads ? upload.single("upload") : [],
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

		app.listen(3000);

		console.log(
			"Express server has started on port 3000. Open http://localhost:3000/users to see results"
		);
	})
	.catch((error) => console.log(error));
