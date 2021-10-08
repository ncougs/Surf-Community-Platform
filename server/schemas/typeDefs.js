const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		first_name: String
		last_name: String
		email: String
		password: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
	}

	type Mutation {
		createUser(
			username: String!
			first_name: String!
			last_name: String!
			email: String!
			password: String!
		): Auth
		login(username: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
