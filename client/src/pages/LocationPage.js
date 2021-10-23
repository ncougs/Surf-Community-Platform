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

const LocationPage = () => {
	const { location } = useParams();
	const currentDay = moment().format('dddd, Do MMMM YYYY');

	const [surfData, updateSurfData] = useState([]);

	useQuery(LOCATION_SURF_DATA, {
		variables: { name: location },
		onCompleted: (data) => updateSurfData(data.surfData),
	});

	const [showComments, setShowComments] = useState(false);
	const [showVideos, setShowVideos] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);

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
			<h2 className='text-center'>Hello {location} Page</h2>
			<Row>
				{surfData.length ? (
					surfData.map((data) => (
						<SurfDataCard
							time={moment(data.time).utc().format('hh:mm a')}
							height={data.waveHeight.noaa}
							direction={data.windDirection.noaa}
							degrees={data.airTemperature.noaa}
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
