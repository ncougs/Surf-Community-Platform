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
	mutation ($file: Upload!, $user_id: ID!, $locationID: ID!, $caption: String) {
		postPhoto(
			file: $file
			user_id: $user_id
			locationID: $locationID
			caption: $caption
		) {
			url
			date
			caption
		}
	}
`;

export const DELETE_PHOTO = gql`
	mutation ($deletePhotoId: ID!, $publicId: String!) {
		deletePhoto(id: $deletePhotoId, public_id: $publicId)
	}
`;

export const UPDATE_PHOTO_CAPTION = gql`
	mutation ($updatePhotoCaptionId: ID!, $caption: String!) {
		updatePhotoCaption(id: $updatePhotoCaptionId, caption: $caption) {
			_id
			caption
		}
	}
`;

export const POST_VIDEO = gql`
	mutation ($file: Upload!, $user_id: ID!, $locationID: ID!, $caption: String) {
		postVideo(
			file: $file
			user_id: $user_id
			locationID: $locationID
			caption: $caption
		) {
			url
			date
		}
	}
`;

export const UPDATE_VIDEO_CAPTION = gql`
	mutation ($updateVideoCaptionId: ID!, $caption: String!) {
		updateVideoCaption(id: $updateVideoCaptionId, caption: $caption) {
			_id
			caption
		}
	}
`;

export const DELETE_VIDEO = gql`
	mutation ($deleteVideoId: ID!, $publicId: String!) {
		deleteVideo(id: $deleteVideoId, public_id: $publicId)
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

export const UPDATE_COMMENT = gql`
	mutation ($body: String!, $updateCommentId: ID!) {
		updateComment(body: $body, id: $updateCommentId) {
			_id
			body
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation ($deleteCommentId: ID!) {
		deleteComment(id: $deleteCommentId)
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
