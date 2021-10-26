import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useState } from 'react';
import ShowComments from '../components/ShowComments';
import ShowPhotos from '../components/ShowPhotos';
import ShowVideos from '../components/ShowVideos';
import { useQuery } from '@apollo/client';
import { LOCATION_SURF_DATA } from '../utils/queries';
import SurfDataCard from '../components/surfDataCard';
import FavLocation from '../components/FavLocation';

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

		section.match(/^comments$/)
			? setShowComments(!showComments)
			: section.match(/^videos$/)
			? setShowVideos(!showVideos)
			: setShowPhotos(!showPhotos);
	};

	return (
		<>
			<h2 className='text-center'>
				Hello {location} Page <FavLocation location={location} />
			</h2>

			<Row>
				{!surfDataLoading ? (
					surfData.surfData.data.map((data, i) => (
						<SurfDataCard
							key={i}
							time={moment(data.dateTime, 'x').utc().format('hh:mm a')}
							height={data.waveHeight}
							direction={data.windDirection}
							degrees={data.airTemperature}
						/>
					))
				) : (
					<p>data loading...</p>
				)}
			</Row>
			<p className='text-center'>{currentDay}</p>
			<Row>
				<Col className='text-center' onClick={handleShowField}>
					Comments
				</Col>
				<Col className='text-center' onClick={handleShowField}>
					Photos
				</Col>
				<Col className='text-center' onClick={handleShowField}>
					Videos
				</Col>
			</Row>
			{showComments && <ShowComments location={location} />}
			{showPhotos && <ShowPhotos location={location} />}
			{showVideos && <ShowVideos location={location} />}
		</>
	);
};

export default LocationPage;
