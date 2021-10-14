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
		locationID: Location!
	}

	type Location {
		_id: ID
		name: String!
		surflineID: String!
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
		photos: [Photo]
		locations: [Location]!
		location(id: ID!): Location!
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
		addLocation(name: String!, surflineID: String!): Location
	}
`;

module.exports = typeDefs;
