import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_PHOTOS } from '../utils/queries';
import { useState } from 'react';
import PhotoCard from './photoCard';

const ShowPhotos = ({ location }) => {
	const [photos, updatePhotos] = useState([]);

	useQuery(LOCATION_TODAY_PHOTOS, {
		variables: { location },
		onCompleted: (data) => updatePhotos(data.locationCurrentDayPhotos),
	});

	return (
		<>
			<h4>Show Photos</h4>
			{photos.length ? (
				photos.map((photo) => {
					return (
						<PhotoCard url={photo.url} date={photo.date} location={location} />
					);
				})
			) : (
				<p>No photos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowPhotos;
