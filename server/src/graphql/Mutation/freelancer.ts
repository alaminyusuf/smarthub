import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { validateFreelancerInputFields } from "./../../utils/validationUtil";

import { Freelancer } from "../../entity/Freelancer";
import { FreelancerInputOptions } from "./../../utils/inputOptions";
import { FreelancerResponseType } from "./../../utils/responseTypes";
import { MyContext } from "./../../types";
import { passwordHash, decryptHash } from "../../utils/passwordHash";
// import { Job } from "../../models/Job";

@Resolver()
export class FreelancerResolver {
	@Mutation(() => FreelancerResponseType)
	async addFreelancer(
		@Arg("options", () => FreelancerInputOptions)
		options: FreelancerInputOptions,
		@Ctx() { req }: MyContext
	): Promise<FreelancerResponseType> {
		const alreadyAFreelancer = await Freelancer.findOne({
			email: options.email,
		});
		if (alreadyAFreelancer) {
			return {
				errors: {
					field: "user",
					message: "user already exist",
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
		req.session.userType = "freelancer";
		return { freelancer };
	}

	@Mutation(() => FreelancerResponseType)
	async FreelancerLogin(
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Ctx() { req }: MyContext
	): Promise<FreelancerResponseType> {
		const freelancer = await Freelancer.findOne({ email: email });
		if (!freelancer) {
			return {
				errors: {
					field: "freelancer",
					message: "such freelancer does not exist",
				},
			};
		}
		const validPassword = await decryptHash(freelancer.password, password);
		if (!validPassword) {
			return {
				errors: {
					field: "password",
					message: "password mismatch",
				},
			};
		}
		req.session.userId = freelancer.id;
		req.session.userType = "freelancer";
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
