import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_COMMENTS } from '../utils/queries';
import { useEffect, useState } from 'react';

const ShowComments = ({ location }) => {
	const { data, loading, error, refetch } = useQuery(LOCATION_TODAY_COMMENTS, {
		variables: { location },
	});

	useEffect(() => {
		refetch();
	});

	return (
		<>
			{data?.locationCurrentDayComments.length ? (
				data.locationCurrentDayComments.map((comment) => {
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
