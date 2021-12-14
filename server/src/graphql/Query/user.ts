import { UserResponseType } from "./../../utils/responseTypes";
import { Client } from "./../../entity/Client";
import { Resolver, Query, Ctx } from "type-graphql";
import { Freelancer } from "../../entity/Freelancer";
import { Job } from "../../entity/Job";
import { MyContext } from "../../types";

@Resolver()
export class UserQuery {
	@Query(() => [Client])
	async getAllClients(): Promise<Client[] | undefined> {
		return await Client.find();
	}
	@Query(() => [Freelancer])
	async getAllFreelancers(): Promise<Freelancer[] | undefined> {
		return await Freelancer.find();
	}
	@Query(() => [Job])
	async getAllJobs(): Promise<Job[] | undefined> {
		return await Job.find();
	}
	@Query(() => UserResponseType)
	async currentUser(@Ctx() { req }: MyContext): Promise<UserResponseType> {
		const notFound = {
			field: "session",
			message: "no cookie found",
		};
		if (!req.session.userId) return { notFound };
		let queriedUser;
		const refId = req.session.userId;
		const session = req.session;
		if (session.userType === "client") {
			queriedUser = await Client.findOne(refId);
			const client = queriedUser;
			return { client };
		} else {
			queriedUser = await Freelancer.findOne(refId);
			const freelancer = queriedUser;
			return { freelancer };
		}
	}
}
