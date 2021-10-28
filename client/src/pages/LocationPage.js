import { useParams } from 'react-router-dom';
import { Row, Col, Container, Nav } from 'react-bootstrap';
import moment from 'moment';
import { useState } from 'react';
import ShowComments from '../components/ShowComments';
import ShowPhotos from '../components/ShowPhotos';
import ShowVideos from '../components/ShowVideos';
import { useQuery } from '@apollo/client';
import { LOCATION_SURF_DATA } from '../utils/queries';
import SurfDataCard from '../components/surfDataCard';
import FavLocation from '../components/FavLocation';
import Auth from '../utils/auth';

const LocationPage = () => {
	//state variables
	const [showComments, setShowComments] = useState(false);
	const [showVideos, setShowVideos] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);

	//get current location for url
	const { location } = useParams();

	//get current date time
	const currentDay = moment().format('dddd, Do MMMM YYYY');

	//get the surf data for the current location
	const {
		loading: surfDataLoading,
		error: surfDataError,
		data: surfData,
	} = useQuery(LOCATION_SURF_DATA, {
		variables: { name: location },
	});

	//determines which field to render
	const handleShowField = (e) => {
		e.preventDefault();
		const section = e.target.textContent.toLowerCase();

		if (section.match(/^comments$/)) {
			setShowVideos(false);
			setShowPhotos(false);

			return setShowComments(!showComments);
		}

		if (section.match(/^videos$/)) {
			setShowComments(false);
			setShowPhotos(false);

			return setShowVideos(!showVideos);
		}

		if (section.match(/^photos$/)) {
			setShowComments(false);
			setShowVideos(false);

			return setShowPhotos(!showPhotos);
		}
	};

	const Styles = {
		mainHeading: {
			fontSize: '3vw',
			color: '#F5F6F9',
		},
		dateHeading: {
			fontSize: '2vw',
			color: '#F5F6F9',
		},
		secondaryBackground: {
			backgroundColor: '#F5F6F9',
		},
		secondaryHeading: {
			fontSize: '2vw',
			color: '#042D3C',
		},
	};

	return (
		<>
			<Container>
				<h2 className='text-center p-2' style={Styles.mainHeading}>
					{location}
					{Auth.loggedIn() && (
						<FavLocation location={location} user={Auth.getProfile()} />
					)}
				</h2>
			</Container>

			<Container>
				<p className='text-center p-2' style={Styles.dateHeading}>
					{currentDay}
				</p>
			</Container>

			<Container>
				<Row>
					{!surfDataLoading ? (
						surfData.surfData.data.map((data, i) => (
							<SurfDataCard
								key={i}
								time={moment(data.dateTime, 'x').utc().format('hh:mm a')}
								height={data.waveHeight}
								direction={data.windDirection}
								degrees={data.airTemperature}
								windSpeed={data.windSpeed}
							/>
						))
					) : (
						<p>data loading...</p>
					)}
				</Row>
			</Container>

			<Container
				fluid
				style={Styles.secondaryBackground}
				className='flex-grow-1 p-0'
			>
				<Container>
					<Nav className='justify-content-center' activeKey='/home'>
						<Nav.Item>
							<Nav.Link eventKey='link-2'>
								<Col
									className='text-center fw-bold p-5'
									onClick={handleShowField}
									style={Styles.secondaryHeading}
								>
									Photos
								</Col>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='link-2'>
								<Col
									className='text-center fw-bold p-5'
									onClick={handleShowField}
									style={Styles.secondaryHeading}
								>
									Comments
								</Col>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='link-3'>
								<Col
									className='text-center fw-bold p-5'
									onClick={handleShowField}
									style={Styles.secondaryHeading}
								>
									Videos
								</Col>
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<Row></Row>
					<Container>
						<Row>
							{showComments && <ShowComments location={location} />}
							{showPhotos && <ShowPhotos location={location} />}
							{showVideos && <ShowVideos location={location} />}
						</Row>
					</Container>
				</Container>
			</Container>
		</>
	);
};

export default LocationPage;
