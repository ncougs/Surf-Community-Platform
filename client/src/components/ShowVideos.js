import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { LOCATION_TODAY_VIDEOS } from '../utils/queries';
import VideoCard from './videoCard';
import DisplayDots from './displayDots';

const ShowVideos = ({ location }) => {
	const [vertical, setVertical] = useState(false);

	const { data, loading, error } = useQuery(LOCATION_TODAY_VIDEOS, {
		variables: { location },
		pollInterval: 5000,
	});

	const handleClick = (e) => {
		setVertical(!vertical);
	};

	const Styles = {
		loadingWheel: {
			color: '#0A9D7B',
		},
		fontColour: {
			color: '#042D3C',
		},
	};

	return (
		<>
			{loading ? (
				<>
					<Col>
						<Spinner animation='border' style={Styles.loadingWheel} />
						<span className='mx-2' style={Styles.fontColour}>
							Loading...
						</span>
					</Col>
				</>
			) : data?.locationCurrentDayVideos.length ? (
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
								caption={video.caption}
								user={video.user_id.username}
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
