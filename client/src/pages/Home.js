import { Row, Col, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { CURRENT_DAY_MEDIA } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';
import DisplayDots from '../components/displayDots';

const Home = () => {
	//get the media for the current day
	const { loading, error, data } = useQuery(CURRENT_DAY_MEDIA, {
		pollInterval: 5000,
	});

	const [vertical, setVertical] = useState(false);

	const handleClick = (e) => {
		setVertical(!vertical);
	};

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
							<>
								<DisplayDots handleClick={handleClick} />
								{data?.currentDayMedia.map((media, i) =>
									media.url.includes('video/upload') ? (
										<VideoCard
											key={i}
											location={media.locationID.name}
											url={media.url}
											date={media.date}
											isVertical={vertical}
										/>
									) : (
										<PhotoCard
											key={i}
											location={media.locationID.name}
											url={media.url}
											date={media.date}
											isVertical={vertical}
										/>
									)
								)}
							</>
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
