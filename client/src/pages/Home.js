import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { CURRENT_DAY_MEDIA } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';

const Home = () => {
	//get the media for the current day
	const { loading, error, data, refetch } = useQuery(CURRENT_DAY_MEDIA);

	useEffect(() => {
		refetch();
	});

	const Styles = {
		mainHeading: {
			fontSize: '10vh',
			color: '#F5F6F9',
		},
		secondaryHeading: {
			fontSize: '10vh',
			color: '#F5F6F9',
			textAlign: 'center',
		},
		card: {
			width: '18rem',
		},
	};
	return (
		<>
			<Row className={'m-auto'}>
				<Col className={'col-8'}>
					<h1 style={Styles.mainHeading}>Local Surf Community Platform</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 style={Styles.secondaryHeading}>Recent Activity</h2>
				</Col>
			</Row>
			<Row>
				{data ? (
					data?.currentDayMedia.map((media, i) =>
						media.url.includes('video/upload') ? (
							<VideoCard
								key={i}
								location={media.locationID.name}
								url={media.url}
								date={media.date}
							/>
						) : (
							<PhotoCard
								key={i}
								location={media.locationID.name}
								url={media.url}
								date={media.date}
							/>
						)
					)
				) : (
					<p>No media uploaded for the day</p>
				)}
			</Row>
		</>
	);
};

export default Home;
