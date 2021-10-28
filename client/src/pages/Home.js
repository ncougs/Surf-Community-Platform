import { Row, Col, Container } from 'react-bootstrap';
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
			fontSize: '5vw',
			color: '#F5F6F9',
		},
		section: {
			minHeight: '80vh',
		},
		secondaryHeading: {
			fontSize: '5vw',
			color: '#042D3C',
			textAlign: 'center',
		},
		recentMedia: {
			backgroundColor: '#F5F6F9',
		},
	};
	return (
		<>
			<Row className={'m-auto'} style={Styles.section}>
				<Col className={'col-8 d-flex'}>
					<h1 className='m-auto' style={Styles.mainHeading}>
						Local Surf Community Platform
					</h1>
				</Col>
			</Row>
			<Container fluid className='p-0 m-0' style={Styles.recentMedia}>
				<h2 className='p-2' style={Styles.secondaryHeading}>
					Recent Activity
				</h2>
				<Container>
					<Row>
						{data?.currentDayMedia.length ? (
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
				</Container>
			</Container>
		</>
	);
};

export default Home;
