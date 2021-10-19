import { gql } from '@apollo/client';

export const LOCATIONS = gql`
	query {
		locations {
			_id
			name
			surflineID
			lat
			lng
		}
	}
`;
