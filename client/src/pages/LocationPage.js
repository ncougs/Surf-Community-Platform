import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useState } from 'react';
import ShowComments from '../components/ShowComments';
import ShowPhotos from '../components/ShowPhotos';
import ShowVideos from '../components/ShowVideos';
import { useQuery, useMutation } from '@apollo/client';
import { LOCATION_SURF_DATA, USER } from '../utils/queries';
import SurfDataCard from '../components/surfDataCard';
import { FAVOURITE_LOCATION } from '../utils/mutations';
import { Star, StarFill } from 'react-bootstrap-icons';
import Auth from '../utils/auth';

const LocationPage = () => {
	//get current users _id
	const {
		data: { _id },
	} = Auth.getProfile();

	//state variables
	const [favLocations, updateFavLocations] = useState([]);
	const [isFavouriteLocation, setFavouriteLocation] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [showVideos, setShowVideos] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);

	//get current location for url
	const { location } = useParams();

	//get current date time
	const currentDay = moment().format('dddd, Do MMMM YYYY');

	//return data of current user
	const { data: userData, refetch } = useQuery(USER, {
		variables: { userId: _id },
		onCompleted: (data) => {
			updateFavLocations(data.user.favourite_locations);
		},
	});

	//get the surf data for the current location
	const {
		loading: surfDataLoading,
		error: surfDataError,
		data: surfData,
	} = useQuery(LOCATION_SURF_DATA, {
		variables: { name: location },
	});

	//mutation to add a favourite location for the current user
	const [favouriteLocation] = useMutation(FAVOURITE_LOCATION);

	const handleFavouriteLocation = async (e) => {
		e.preventDefault();

		const { data } = await favouriteLocation({
			variables: { user_id: userData.user._id, location },
		});

		//on completion update faviourite location
		updateFavLocations(data.favouriteLocation.favourite_locations);
	};

	//runs whenver favLocation changes
	//check if current location is a favourite
	//if true - set isFavLocation to true else false
	useEffect(() => {
		const singleLocation = favLocations.filter((i) => i.name === location);

		singleLocation.length
			? setFavouriteLocation(true)
			: setFavouriteLocation(false);
	}, [favLocations]);

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
				Hello {location} Page
				{isFavouriteLocation ? (
					<StarFill
						className='mx-3'
						onClick={(e) => handleFavouriteLocation(e)}
					/>
				) : (
					<Star className='mx-3' onClick={(e) => handleFavouriteLocation(e)} />
				)}
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
