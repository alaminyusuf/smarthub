process.env.NODE_ENV = "test";
import { Connection } from "typeorm";
import { createTestConn } from "../utils/testConnection";
import { Freelancer } from "../entity/Freelancer";
import { testCall } from "./../utils/graphqlTestCalls";
import faker from "faker";

const addFreelancerMutation = `
mutation AddFreelancer($options: FreelancerInputOptions!) {
   addFreelancer(options: $options) {
   freelancer {
      firstName
      email
      about
      jobTitle
   }
   errors {
      field
      message
   }
   }
}
`;

let conn: Connection;

describe("freelancer resolver", () => {
	beforeAll(async () => {
		conn = await await createTestConn();
	});

	afterAll(async () => {
		await conn.close();
	});

	it("should register and login a user", async () => {
		const { graphqlTestRun } = await testCall();
		const user = {
			email: faker.internet.email(),
			phone: faker.phone.phoneNumberFormat(),
			password: faker.internet.password(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			country: faker.address.country(),
			jobTitle: faker.name.jobTitle(),
			about: faker.lorem.words(),
		};

		const freelancer = await graphqlTestRun({
			source: addFreelancerMutation,
			variableValues: {
				options: user,
			},
		});

		expect(freelancer).toMatchObject({
			data: {
				addFreelancer: {
					freelancer: {
						email: user.email,
						firstName: user.firstName,
						jobTitle: user.jobTitle,
						about: user.about,
					},
				},
			},
		});

		const allFreeelancers = await Freelancer.find();
		const dbUser = await Freelancer.findOne({ where: { email: user.email } });
		expect(dbUser).toBeDefined();
		expect(allFreeelancers).toBeUndefined;
	});
});
