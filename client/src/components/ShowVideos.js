import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_VIDEOS } from '../utils/queries';
import { useState } from 'react';
import VideoCard from './videoCard';

const ShowVideos = ({ location }) => {
	const [videos, updatePhotos] = useState([]);

	useQuery(LOCATION_TODAY_VIDEOS, {
		variables: { location },
		onCompleted: (data) => updatePhotos(data.locationCurrentDayVideos),
	});

	return (
		<>
			<h4>Show Videos</h4>
			{videos.length ? (
				videos.map((video) => {
					return (
						<VideoCard url={video.url} date={video.date} location={location} />
					);
				})
			) : (
				<p>No videos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowVideos;
