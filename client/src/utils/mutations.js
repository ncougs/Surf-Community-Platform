import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation loginUser {
		login($username: String, $password: String) {
			user {
                _id
                username
                first_name
                last_name
                email
			}
			token
		}
	}
`;
