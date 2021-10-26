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
		favourite_locations: [Location]
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
		lat: Float!
		lng: Float!
		dailySurfData: [DailyData]
	}

	type SurfData {
		_id: ID
		airTemperature: Float
		gust: Float
		swellDirection: Float
		swellHeight: Float
		dateTime: String
		waveHeight: Float
		windDirection: Float
		windSpeed: Float
	}

	type DailyData {
		_id: ID
		date: String
		data: [SurfData]
	}

	type Query {
		users: [User]!
		user(id: ID!): User!
		photos: [Photo]
		currentDayPhotos: [Photo]
		locationCurrentDayPhotos(location: String!): [Photo]
		userPhotos(user_id: ID!): [Photo]
		videos: [Video]
		currentDayVideos: [Video]
		locationCurrentDayVideos(location: String!): [Video]
		userVideos(user_id: ID!): [Video]
		comments: [Comment]
		locationCurrentDayComments(location: String!): [Comment]
		locations: [Location]!
		location(id: ID!): Location!
		surfData(name: String!): DailyData
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
		addLocation(name: String!, lat: Float!, lng: Float!): Location
		postPhoto(file: Upload!, user_id: ID!, locationID: ID!): Photo!
		postVideo(file: Upload!, user_id: ID!, locationID: ID!): Video!
		postComment(body: String!, user_id: ID!, locationID: ID!): Comment!
		favouriteLocation(user_id: ID!, location: String!): User!
	}
`;

module.exports = typeDefs;
