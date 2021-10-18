import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon from "argon2";
import { getMongoManager } from "typeorm";

import { validateClientInputFields } from "./../../utils/validationUtil";
import { Client } from "./../../models/Client";
import { ClientInputOptions } from "./../../utils/inputOptions";
import {
	ClientResponseType,
	LoginResponseType,
} from "./../../utils/responseTypes";
import { MyContext } from "./../../types";
import { Freelancer } from "../../models/Freelancer";
import { FreelancerInputOptions } from "../../utils/inputOptions";
import { FreelancerResponseType } from "../../utils/responseTypes";
import { validateFreelancerInputFields } from "../../utils/validationUtil";
// import { Job } from "../../models/Job";
// import { isAuth } from "../../middleware/isAuth";
@Resolver()
export class UserResolver {
	@Mutation(() => FreelancerResponseType)
	async addFreelancer(
		@Arg("options", () => FreelancerInputOptions)
		options: FreelancerInputOptions,
		@Ctx() { req }: MyContext
	): Promise<FreelancerResponseType> {
		const manager = getMongoManager();
		let freelancer;
		const alreadyAUser = await Freelancer.findOne({ email: options.email });
		if (alreadyAUser) {
			return {
				errors: {
					field: "user",
					message: "user already exists",
				},
			};
		}
		const errors = validateFreelancerInputFields(options);
		if (errors)
			return {
				errors,
			};

		const hashedPassword = await argon.hash(options.password);
		const result = await Freelancer.create({
			...options,
			password: hashedPassword,
		});
		freelancer = result;

		await manager.save(freelancer);

		req.session.userId = freelancer.id;

		return { freelancer };
	}
	@Mutation(() => ClientResponseType)
	async addClient(
		@Arg("options", () => ClientInputOptions) options: ClientInputOptions,
		@Ctx() { req }: MyContext
	): Promise<ClientResponseType> {
		const {
			companyName,
			country,
			firstName,
			lastName,
			phone,
			password,
			email,
		} = options;
		const alreadyAClient = await Client.findOne({ email: options.email });
		if (alreadyAClient) {
			return {
				errors: {
					field: "user",
					message: "user already exists",
				},
			};
		}
		const errors = validateClientInputFields(options);
		if (errors) return { errors };

		const hashedPassword = await argon.hash(password);
		const client = new Client();
		client.password = hashedPassword;
		(client.firstName = firstName),
			(client.lastName = lastName),
			(client.password = hashedPassword),
			(client.phone = phone),
			(client.email = email),
			(client.country = country),
			(client.companyName = companyName);

		const manager = getMongoManager();
		await manager.save(client);
		console.log("Client", client);
		req.session.userId = client.id;
		return { client };
	}

	// @Mutation(() => JobResponseType)
	// @UseMiddleware(isAuth)
	// async postJob(
	// 	@Arg("options", () => JobInputOptions) options: JobInputOptions,
	// 	@Ctx() { req }: MyContext
	// ): Promise<JobResponseType> {
	// 	let job;
	// 	const errors = validateJobInputFields(options);
	// 	if (errors) return { errors };
	// 	try {
	// 		const result = await Job.create({
	// 			...options,
	// 		}).save();
	// 		job = result;
	// 	} catch (e) {
	// 		if (e.code == "23505") {
	// 			return {
	// 				errors: {
	// 					field: "email",
	// 					message: "email already taken",
	// 				},
	// 			};
	// 		}
	// 	}
	// 	return { job };
	// }
	@Mutation(() => LoginResponseType)
	async loginAsClient(
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Ctx() { req }: MyContext
	): Promise<LoginResponseType> {
		const client = await Client.findOne({ email: email });
		if (!client) {
			return {
				errors: {
					field: "user",
					message: "user does not exits",
				},
			};
		}
		const valid = await argon.verify(client.password, password);
		if (!valid) {
			return {
				errors: {
					field: "password",
					message: "password mismatch",
				},
			};
		}
		req.session.userId = client.id;
		return { client };
	}
	@Mutation(() => LoginResponseType)
	async loginAsFreelancer(
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Ctx() { req }: MyContext
	): Promise<LoginResponseType> {
		const freelancer = await Freelancer.findOne({ email });
		if (!freelancer) {
			return {
				errors: {
					field: "user",
					message: "user does not exits",
				},
			};
		}
		const valid = await argon.verify(freelancer.password, password);
		if (!valid) {
			return {
				errors: {
					field: "password",
					message: "password mismatch",
				},
			};
		}
		req.session.userId = freelancer.id;
		return { freelancer };
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
