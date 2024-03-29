import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyContext } from "./types";

import express from "express";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import cors from "cors";

import { FreelancerResolver } from "./graphql/Mutation/freelancer";
import { ClientResolver } from "./graphql/Mutation/client";
import { UserQuery } from "./graphql/Query/user";

async function StartServer() {
	let retries = 5;
	try {
		while (retries) {
			await createConnection();
			break;
		}
	} catch (e) {
		console.log("db-error:", e);
		retries -= 1;
		console.log(`retries left: ${retries}`);
		await new Promise((res) => setTimeout(res, 4000));
	}

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
			secret: "some secret",
			resave: false,
			name: "smarthub",
			saveUninitialized: false,
		})
	);

	app.get("/", (_, res) =>
		res.send("<h1>Hello from this awesome mock Api</h1>")
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [ClientResolver, FreelancerResolver, UserQuery],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ req, res, redis }),
	});

	apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

	app.listen(7100, () => console.log("Server Running 7100"));
}

StartServer();
