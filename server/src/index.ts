import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyContext } from "./types";

import express from "express";
import dotenv from "dotenv";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import cors from "cors";

import { UserResolver } from "./graphql/Mutation/user";
import { UserQuery } from "./graphql/Query/user";

dotenv.config();

const COOKIE_SECRET = process.env.COOKIE_SECRET;

async function StartServer() {
	let retries = 5;
	try {
		while (retries) {
			await createConnection();
			break;
		}
	} catch (e) {
		console.log("db-error---", e);
		retries -= 1;
		console.log(`retries left: ${retries}`);
		await new Promise((res) => setTimeout(res, 4000));
	}
	// await createConnection({
	// 	type: "postgres",
	// 	host: "localhost",
	// 	port: 27017,
	// 	database: "smarthub",
	// 	entities: ["src/models/*{.ts,.js}"],
	// 	useUnifiedTopology: true,
	// }).then((conn) => console.log("MongoDB connected", conn.isConnected));

	const app = express();

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	const RedisStore = connectRedis(session);
	const redis = new Redis({
		host: "redis-service",
		port: 6379,
	});

	app.use(
		session({
			store: new RedisStore({
				client: redis,
				disableTTL: true,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 5,
				httpOnly: true,
				secure: false,
			},
			secret: COOKIE_SECRET || "secret",
			resave: false,
			name: "smarthub",
			saveUninitialized: false,
		})
	);

	app.get("/", (req, res) =>
		res.send("<h1>Hello from this awesome mock Api</h1>")
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, UserQuery],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ req, res, redis }),
	});

	apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

	app.listen(7100, () => console.log("Server running"));
}

StartServer().catch((error) => console.error("Error:", error));
