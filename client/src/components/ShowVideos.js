import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { LOCATION_TODAY_VIDEOS } from '../utils/queries';
import VideoCard from './videoCard';

const ShowVideos = ({ location }) => {
	const { data, loading, error, refetch } = useQuery(LOCATION_TODAY_VIDEOS, {
		variables: { location },
	});

	useEffect(() => {
		refetch();
	});

	return (
		<>
			{data?.locationCurrentDayVideos.length ? (
				data.locationCurrentDayVideos.map((video) => {
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
