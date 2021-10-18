import { Client } from "./../models/Client";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class FreelancerInputOptions {
	@Field(() => String)
	password: string;
	@Field(() => String)
	email: string;
	@Field(() => String)
	firstName: string;
	@Field(() => String)
	lastName: string;
	@Field(() => String)
	country: string;
	@Field(() => String)
	jobTitle: string;
	@Field(() => Int)
	phone: string;
	@Field(() => String)
	about: string;
}
@InputType()
export class LoginOptions {
	@Field(() => String)
	email: string;
	@Field(() => String)
	password: string;
}
@InputType()
export class ClientInputOptions {
	@Field(() => String)
	password: string;
	@Field(() => String)
	email: string;
	@Field(() => String)
	firstName: string;
	@Field(() => String)
	lastName: string;
	@Field(() => String)
	companyName: string;
	@Field(() => String)
	country: string;
	@Field(() => Int)
	phone: number;
}
@InputType()
export class JobInputOptions {
	@Field(() => String)
	title: string;
	@Field(() => String)
	desc: string;
	@Field(() => Int)
	price: number;
	@Field(() => String)
	proposals: string;
	@Field(() => Client)
	author: Client;
	@Field(() => Boolean)
	done: boolean;
}
