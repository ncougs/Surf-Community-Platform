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
