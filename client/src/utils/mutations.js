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
	mutation POST_PHOTO($url: String!, $user_id: ID!) {
		postPhoto(url: $url, user_id: $user_id) {
			date
			url
			user_id {
				username
			}
		}
	}
`;
