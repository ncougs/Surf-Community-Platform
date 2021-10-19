import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useState } from 'react';
import ShowComments from '../components/ShowComments';
import ShowPhotos from '../components/ShowPhotos';
import ShowVideos from '../components/ShowVideos';

const LocationPage = () => {
	const { name } = useParams();
	const currentDay = moment().format('dddd, Do MMMM YYYY');

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
			<h2 className='text-center'>Hello {name} Page</h2>
			<Row className='border border-2'>
				<Col className='text-start'>19°</Col>
				<Col className='text-center'>3ft</Col>
				<Col className='text-end'>NE</Col>
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
			{showComments && <ShowComments />}
			{showPhotos && <ShowPhotos />}
			{showVideos && <ShowVideos />}
		</>
	);
};

export default LocationPage;
