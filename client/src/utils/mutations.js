import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation userLogin($username: String!, $password: String!) {
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
