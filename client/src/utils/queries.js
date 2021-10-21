import { gql } from '@apollo/client';

//get all locations
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

//get all photos
export const PHOTOS = gql`
	query {
		photos {
			url
			date
			user_id {
				_id
				username
				first_name
				last_name
				email
			}
			locationID {
				_id
				name
				surflineID
				lat
				lng
			}
		}
	}
`;

//Get all photos for the current day
export const TODAY_PHOTOS = gql`
	query {
		currentDayPhotos {
			_id
			date
			url
			user_id {
				_id
				username
				first_name
				last_name
				email
			}
			locationID {
				_id
				name
				surflineID
				lat
				lng
			}
		}
	}
`;

//Get all photos for the current day at a particular location
export const LOCATION_TODAY_PHOTOS = gql`
	query ($location: String!) {
		locationCurrentDayPhotos(location: $location) {
			_id
			date
			url
			user_id {
				_id
				username
				first_name
				last_name
				email
			}
			locationID {
				_id
				name
				surflineID
				lat
				lng
			}
		}
	}
`;
