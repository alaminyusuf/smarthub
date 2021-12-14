import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import {
	validateClientInputFields,
	validateFreelancerInputFields,
} from "./../../utils/validationUtil";
import { Client } from "../../entity/Client";
import { Freelancer } from "../../entity/Freelancer";
import {
	ClientInputOptions,
	FreelancerInputOptions,
} from "./../../utils/inputOptions";
import {
	ClientResponseType,
	LoginResponseType,
	FreelancerResponseType,
} from "./../../utils/responseTypes";
import { MyContext } from "./../../types";
import { passwordHash, decryptHash } from "../../utils/passwordHash";
// import { Job } from "../../models/Job";
// import { isAuth } from "../../middleware/isAuth";
@Resolver()
export class UserResolver {
	@Mutation(() => FreelancerResponseType)
	async addFreelancer(
		@Arg("options", () => FreelancerInputOptions)
		options: FreelancerInputOptions,
		@Ctx() { req }: MyContext
	): Promise<any> {
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
		if (errors) return { errors };
		const hashedPassword = await passwordHash(options.password);

		const freelancer = await Freelancer.create({
			...options,
			password: hashedPassword,
		}).save();

		req.session.userId = freelancer.id;

		return { freelancer };
	}
	@Mutation(() => ClientResponseType)
	async addClient(
		@Arg("options", () => ClientInputOptions) options: ClientInputOptions,
		@Ctx() { req }: MyContext
	): Promise<ClientResponseType> {
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

		const hashedPassword = await passwordHash(options.password);
		const client = await Client.create({
			...options,
			password: hashedPassword,
		}).save();

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
		const valid = await decryptHash(client.password, password);
		if (valid) {
			req.session.userId = client.id;
			return { client };
		}
		return {
			errors: {
				field: "password",
				message: "password mismatch",
			},
		};
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
		const valid = await decryptHash(freelancer.password, password);
		if (valid) {
			req.session.userId = freelancer.id;
			return { freelancer };
		}
		return {
			errors: {
				field: "password",
				message: "password mismatch",
			},
		};
	}
}
