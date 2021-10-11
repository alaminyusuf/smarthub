import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
// import { createConnection } from "typeorm";

dotenv.config({});
// const MONGO_URI = process.env.MONGO_URI;
// const DB_NAME = process.env.DB_NAME;

const main = async () => {
	const app = express();
	// await createConnection({
	// 	type: "mongodb",
	// 	url: MONGO_URI,
	// 	database: DB_NAME,
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// }).then(() => console.info("MongoDB connected"));

	app.listen(4100, () => console.info("app listening on PORT 4100"));
};

main();
