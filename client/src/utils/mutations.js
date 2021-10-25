import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation ($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				username
				email
			}
			token
		}
	}
`;

export const CREATE_USER = gql`
	mutation (
		$username: String!
		$first_name: String!
		$last_name: String!
		$email: String!
		$password: String!
	) {
		createUser(
			username: $username
			first_name: $first_name
			last_name: $last_name
			email: $email
			password: $password
		) {
			user {
				username
				email
			}
			token
		}
	}
`;

export const POST_PHOTO = gql`
	mutation ($file: Upload!, $user_id: ID!, $locationID: ID!) {
		postPhoto(file: $file, user_id: $user_id, locationID: $locationID) {
			url
			date
		}
	}
`;

export const POST_VIDEO = gql`
	mutation ($file: Upload!, $user_id: ID!, $locationID: ID!) {
		postVideo(file: $file, user_id: $user_id, locationID: $locationID) {
			url
			date
		}
	}
`;

export const POST_COMMENT = gql`
	mutation ($body: String!, $user_id: ID!, $locationID: ID!) {
		postComment(body: $body, user_id: $user_id, locationID: $locationID) {
			_id
			body
			date
		}
	}
`;

export const FAVOURITE_LOCATION = gql`
	mutation ($user_id: ID!, $location: String!) {
		favouriteLocation(user_id: $user_id, location: $location) {
			_id
			username
			first_name
			last_name
			email
			favourite_locations {
				_id
				name
				lat
				lng
			}
		}
	}
`;
