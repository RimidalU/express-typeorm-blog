import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from 'dotenv';

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
	entities: [User],
	migrations: [],
	subscribers: [],
});
