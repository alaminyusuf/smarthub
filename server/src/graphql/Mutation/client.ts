import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { validateClientInputFields } from "./../../utils/validationUtil";

import { ClientInputOptions } from "./../../utils/inputOptions";
import { ClientResponseType } from "./../../utils/responseTypes";
import { MyContext } from "./../../types";
import { passwordHash, decryptHash } from "../../utils/passwordHash";
import { Client } from "../../entity/Client";
// import { Job } from "../../models/Job";

@Resolver()
export class ClientResolver {
	@Mutation(() => ClientResponseType)
	async addClient(
		@Arg("options", () => ClientInputOptions)
		options: ClientInputOptions,
		@Ctx() { req }: MyContext
	): Promise<ClientResponseType> {
		const alreadyAClient = await Client.findOne({
			email: options.email,
		});
		if (alreadyAClient) {
			return {
				errors: {
					field: "user",
					message: "user already exist",
				},
			};
		}
		const errors = validateClientInputFields(options);
		if (errors) return { errors };
		const hashedPassword = await passwordHash(options.password);
		const client = await Client.create({
			...options,
			password: hashedPassword,
		}).save();
		req.session.userId = client.id;
		req.session.userType = "client";
		return { client };
	}

	@Mutation(() => ClientResponseType)
	async ClientLogin(
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Ctx() { req }: MyContext
	): Promise<ClientResponseType> {
		const client = await Client.findOne({ email: email });
		if (!client) {
			return {
				errors: {
					field: "client",
					message: "such client does not exist",
				},
			};
		}
		const validPassword = await decryptHash(client.password, password);
		if (!validPassword) {
			return {
				errors: {
					field: "password",
					message: "password mismatch",
				},
			};
		}
		req.session.userId = client.id;
		req.session.userType = "client";
		return { client };
	}
	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
		res.clearCookie("smarthub");
		return new Promise((resolve) =>
			req.session.destroy((err: any) => {
				if (err) {
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}
}
