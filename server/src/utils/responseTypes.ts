import { Client } from "./../models/Client";
import { ObjectType, Field } from "type-graphql";
import { Freelancer } from "../models/Freelancer";
import { Proposal } from "../models/Proposal";
import { Job } from "../models/Job";

@ObjectType()
class ResponseError {
	@Field(() => String)
	field: string;
	@Field(() => String)
	message: string;
}
@ObjectType()
export class FreelancerResponseType {
	@Field(() => Freelancer, { nullable: true })
	freelancer?: Freelancer;
	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
}
@ObjectType()
export class ClientResponseType {
	@Field(() => Client, { nullable: true })
	client?: Client;
	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
}
@ObjectType()
export class LoginResponseType {
	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
	@Field(() => Client, { nullable: true })
	client?: Client;
	@Field(() => Freelancer, { nullable: true })
	freelancer?: Freelancer;
}
@ObjectType()
export class ProposalResponseType {
	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
	@Field(() => Proposal, { nullable: true })
	proposal?: Proposal;
}
@ObjectType()
export class JobResponseType {
	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
	@Field(() => Job, { nullable: true })
	job?: Job;
}
