import "reflect-metadata";
import * as dotenv from 'dotenv';

import { DataSource } from "typeorm";
import { UserEntity } from "./entity/User";
import { PostEntity } from "./entity/Post";

dotenv.config()
console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT || 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [UserEntity, PostEntity],
	migrations: [],
	subscribers: [],
});
