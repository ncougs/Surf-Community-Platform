import { gql } from '@apollo/client';

//get all locations
export const LOCATIONS = gql`
	query {
		locations {
			_id
			name
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
				lat
				lng
			}
		}
	}
`;

//Get curent user photos
export const USER_PHOTOS = gql`
	query ($userId: ID!) {
		userPhotos(user_id: $userId) {
			_id
			url
			date
			locationID {
				name
			}
		}
	}
`;

//get all videos
export const VIDEOS = gql`
	query {
		videos {
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
				lat
				lng
			}
		}
	}
`;

//Get all videos for the current day
export const TODAY_VIDEOS = gql`
	query {
		currentDayVideos {
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
				lat
				lng
			}
		}
	}
`;

//Get all videos for the current day at a particular location
export const LOCATION_TODAY_VIDEOS = gql`
	query ($location: String!) {
		locationCurrentDayVideos(location: $location) {
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
				lat
				lng
			}
		}
	}
`;

//Get curent user VIDEOS
export const USER_VIDEOS = gql`
	query ($userId: ID!) {
		userVideos(user_id: $userId) {
			_id
			url
			date
			locationID {
				name
			}
		}
	}
`;

//Get all comments for the current day at a particular location
export const LOCATION_TODAY_COMMENTS = gql`
	query ($location: String!) {
		locationCurrentDayComments(location: $location) {
			_id
			date
			body
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
				lat
				lng
			}
		}
	}
`;

//Get surf data for a location
export const LOCATION_SURF_DATA = gql`
	query ($name: String!) {
		surfData(name: $name) {
			date
			data {
				airTemperature
				gust
				swellDirection
				swellHeight
				dateTime
				waveHeight
				windDirection
				windSpeed
			}
		}
	}
`;

//Get curent user info
export const USER = gql`
	query ($userId: ID!) {
		user(id: $userId) {
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
				dailySurfData {
					_id
					date
					data {
						_id
						airTemperature
						gust
						swellDirection
						swellHeight
						dateTime
						waveHeight
						windDirection
						windSpeed
					}
				}
			}
		}
	}
`;

//Get curent user fav locations
export const USER_FAV_LOCATIONS = gql`
	query Query($id: ID!) {
		userFavLocations(id: $id) {
			_id
			name
			lat
			lng
		}
	}
`;
