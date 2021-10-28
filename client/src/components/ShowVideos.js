import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOCATION_TODAY_VIDEOS } from '../utils/queries';
import VideoCard from './videoCard';
import DisplayDots from './displayDots';

const ShowVideos = ({ location }) => {
	const [vertical, setVertical] = useState(false);

	const { data, loading, error, refetch } = useQuery(LOCATION_TODAY_VIDEOS, {
		variables: { location },
	});

	useEffect(() => {
		refetch();
	});

	const handleClick = (e) => {
		setVertical(!vertical);
	};

	return (
		<>
			{data?.locationCurrentDayVideos.length ? (
				<>
					<DisplayDots handleClick={handleClick} />
					{data?.locationCurrentDayVideos.map((video, i) => {
						return (
							<VideoCard
								key={i}
								url={video.url}
								date={video.date}
								location={location}
								isVertical={vertical}
							/>
						);
					})}
				</>
			) : (
				<p>No videos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowVideos;
