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

	type Comment {
		_id: ID!
		body: String!
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

	type Swells {
		height: Float
		period: Int
		direction: Float
		directionMin: Float
		optimalScore: Int
	}

	type Wave {
		timestamp: String!
		utcOffset: Int
		swells: [Swells]
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
		comments: [Comment]
		locationCurrentDayComments(location: String!): [Comment]
		locations: [Location]!
		location(id: ID!): Location!
		surfData(name: String!): [Wave]!
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
		postComment(body: String!, user_id: ID!, locationID: ID!): Comment!
	}
`;

module.exports = typeDefs;
