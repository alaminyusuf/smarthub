import { createConnection } from "typeorm";

export const createTestConn = async () =>
	createConnection({
		type: "postgres",
		host: "localhost",
		port: 5433,
		username: "test",
		password: "test",
		database: "test",
		synchronize: true,
		dropSchema: true,
		logging: false,
		entities: ["src/entity/**/*"],
	});
