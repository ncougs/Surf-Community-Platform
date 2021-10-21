import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_COMMENTS } from '../utils/queries';
import { useState } from 'react';

const ShowComments = ({ location }) => {
	const [comments, updatePhotos] = useState([]);

	useQuery(LOCATION_TODAY_COMMENTS, {
		variables: { location },
		onCompleted: (data) => updatePhotos(data.locationCurrentDayComments),
	});

	return (
		<>
			<h4>Show Comments</h4>
			{comments.length ? (
				comments.map((comment) => {
					return (
						<>
							<h5>{comment.user_id.username}</h5>
							<p>{comment.body}</p>
						</>
					);
				})
			) : (
				<p>No comments added for the day</p>
			)}
		</>
	);
};

export default ShowComments;
