const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar Upload

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
		_id: ID!
		url: String!
		date: String!
		user_id: User!
		locationID: Location!
	}

	type Video {
		_id: ID!
		url: String!
		date: String!
		user_id: User!
		locationID: Location!
	}

	type Location {
		_id: ID
		name: String!
		surflineID: String!
		lat: Float!
		lng: Float!
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
		photos: [Photo]
		currentDayPhotos: [Photo]
		locationCurrentDayPhotos(location: String!): [Photo]
		videos: [Video]
		currentDayVideos: [Video]
		locationCurrentDayVideos(location: String!): [Video]
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
		addLocation(
			name: String!
			surflineID: String!
			lat: Float!
			lng: Float!
		): Location
		postPhoto(file: Upload!, user_id: ID!, locationID: ID!): Photo!
		postVideo(file: Upload!, user_id: ID!, locationID: ID!): Video!
	}
`;

module.exports = typeDefs;
