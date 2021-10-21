import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_VIDEOS } from '../utils/queries';
import { useState } from 'react';

const ShowVideos = ({ location }) => {
	const [videos, updatePhotos] = useState([]);

	useQuery(LOCATION_TODAY_VIDEOS, {
		variables: { location },
		onCompleted: (data) => updatePhotos(data.locationCurrentDayVideos),
	});

	return (
		<>
			<h4>Show Videos</h4>
			{videos ? (
				videos.map((photo) => {
					return <img src={videos.url} alt='surf'></img>;
				})
			) : (
				<p>No videos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowVideos;
