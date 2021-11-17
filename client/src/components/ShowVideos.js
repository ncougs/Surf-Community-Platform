import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Col, Spinner, Button, Row } from 'react-bootstrap';
import moment from 'moment';
import { LOCATION_VIDEOS } from '../utils/queries';
import VideoCard from './videoCard';
import DisplayDots from './displayDots';

const ShowVideos = ({ location }) => {
	const [vertical, setVertical] = useState(true);
	const [date, setDate] = useState(moment().startOf('day').format('x'));

	const { data, loading, error, previousData } = useQuery(LOCATION_VIDEOS, {
		variables: { location, date },
		pollInterval: 500,
		fetchPolicy: 'network-only', // Used for first execution
		nextFetchPolicy: 'cache-first', // Used for subsequent executions
	});

	const handleClick = (e) => {
		setVertical(!vertical);
	};

	const handlePreviousDay = (e) => {
		e.preventDefault();

		const startDate = moment(date, 'x');

		const previousDay = startDate.subtract(1, 'days').format('x');

		setDate(previousDay);
	};

	const Styles = {
		loadingWheel: {
			color: '#0A9D7B',
		},
		fontColour: {
			color: '#042D3C',
		},
		button: {
			backgroundColor: '#0A9D7B',
			borderColor: '#0A9D7B',
			color: '#F5F6F9',
		},
	};

	return (
		<>
			{loading ? (
				<>
					{previousData ? null : (
						<Col>
							<Spinner animation='border' style={Styles.loadingWheel} />
							<span className='mx-2' style={Styles.fontColour}>
								Loading...
							</span>
						</Col>
					)}

					<Row>
						{previousData?.locationVideos.map((video, i) => {
							return (
								<VideoCard
									key={i}
									url={video.url}
									date={video.date}
									location={location}
									isVertical={vertical}
									caption={video.caption}
									user={video.user_id.username}
									id={video._id}
									public_id={video.public_id}
									userID={video.user_id._id}
								/>
							);
						})}
					</Row>
				</>
			) : data?.locationVideos.length ? (
				<>
					<DisplayDots handleClick={handleClick} />
					<Row>
						{data?.locationVideos.map((video, i) => {
							return (
								<VideoCard
									key={i}
									url={video.url}
									date={video.date}
									location={location}
									isVertical={vertical}
									caption={video.caption}
									user={video.user_id.username}
									id={video._id}
									public_id={video.public_id}
									userID={video.user_id._id}
								/>
							);
						})}
					</Row>
				</>
			) : (
				<p>No videos uploaded for the day</p>
			)}
			<Col className='d-flex flex-column'>
				{loading ? (
					<Button
						disabled
						onClick={(e) => handlePreviousDay(e)}
						style={Styles.button}
						className='m-3 align-self-center'
					>
						<Spinner
							as='span'
							animation='grow'
							size='sm'
							role='status'
							aria-hidden='true'
							className='me-2'
						/>
						Loading...
					</Button>
				) : (
					<Button
						onClick={(e) => handlePreviousDay(e)}
						style={Styles.button}
						className='m-3 align-self-center'
					>
						Previous Day ?
					</Button>
				)}
			</Col>
		</>
	);
};

export default ShowVideos;
