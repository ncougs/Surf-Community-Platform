import { Row, Col, CardGroup, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { TODAY_PHOTOS, TODAY_VIDEOS } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';

const Home = () => {
	//get the photos for the current day
	const {
		loading: photosLoading,
		error: photosError,
		data: photosData,
	} = useQuery(TODAY_PHOTOS);

	//get the videos for the current day
	const {
		loading: videosLoading,
		error: videosError,
		data: videosData,
	} = useQuery(TODAY_VIDEOS);

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
				{photosData?.currentDayPhotos.length ? (
					photosData?.currentDayPhotos.map((photo) => (
						<PhotoCard
							location={photo.locationID.name}
							url={photo.url}
							date={photo.date}
						/>
					))
				) : (
					<p>No media uploaded for the day</p>
				)}
			</Row>
			<Row>
				{videosData?.currentDayVideos.length ? (
					videosData?.currentDayVideos.map((video) => (
						<VideoCard
							location={video.locationID.name}
							url={video.url}
							date={video.date}
						/>
					))
				) : (
					<p>No media uploaded for the day</p>
				)}
			</Row>
		</>
	);
};

export default Home;
