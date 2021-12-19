import { buildTypeDefsAndResolvers } from "type-graphql";
import { FreelancerResolver } from "./../graphql/Mutation/freelancer";
import { graphql } from "graphql";
import { makeExecutableSchema } from "apollo-server-express";
import { UserQuery } from "../graphql/Query/user";
import { Maybe } from "graphql/jsutils/Maybe";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: any;
	}>;
	userId?: number;
}

export const testCall = async () => {
	const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
		resolvers: [UserQuery, FreelancerResolver],
	});

	let schema = makeExecutableSchema({ typeDefs, resolvers });

	const graphqlTestRun = async ({
		source,
		variableValues,
		userId,
	}: Options) => {
		return graphql({
			schema,
			source,
			variableValues,
			contextValue: {
				req: {
					session: {
						userId,
					},
				},
				res: {
					clearCookie: jest.fn(),
				},
			},
		});
	};

	return {
		graphqlTestRun,
	};
};
