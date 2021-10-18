import { Resolver, Query, Ctx } from "type-graphql";
import { Freelancer } from "../../models/Freelancer";
import { Job } from "../../models/Job";
import { MyContext } from "../../types";

@Resolver()
export class UserQuery {
	@Query(() => [Freelancer])
	async getAllFreelancers(): Promise<Freelancer[] | undefined> {
		return await Freelancer.find();
	}
	@Query(() => [Job])
	async getAllJobs(): Promise<Job[] | undefined> {
		return await Job.find();
	}
	@Query(() => Freelancer, { nullable: true })
	async currentUser(@Ctx() { req }: MyContext) {
		if (!req.session.userId) return undefined;
		const refId = req.session.userId;
		const user = await Freelancer.findOne(refId);
		return user;
	}
}
