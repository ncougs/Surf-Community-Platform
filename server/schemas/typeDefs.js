const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		first_name: String
		last_name: String
		email: String
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
	}

	type Mutation {
		addUser(
			username: String!
			first_name: String!
			last_name: String!
			email: String!
			password: String!
		): User
	}
`;

module.exports = typeDefs;
