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

	type Photo {
		url: String!
		date: String!
		user_id: User!
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
		photos: [Photo]
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
		postPhoto(url: String, user_id: ID): Photo
	}
`;

module.exports = typeDefs;
