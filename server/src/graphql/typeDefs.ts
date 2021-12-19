import { gql } from "apollo-server-express";
const typeDefs = gql`
type FreelancerResponseType {
freelancer: Freelancer
errors: ResponseError
}
​
input FreelancerInputOptions {
password: String!
email: String!
firstName: String!
lastName: String!
country: String!
jobTitle: String!
phone: Int!
about: String!
}
​
type ClientResponseType {
client: Client
errors: ResponseError
}
​
input ClientInputOptions {
password: String!
email: String!
firstName: String!
lastName: String!
companyName: String!
country: String!
phone: Int!
}
​`;
export default typeDefs;
