import { useQuery } from '@apollo/client';
import { LOCATION_TODAY_PHOTOS } from '../utils/queries';
import { useState } from 'react';

const ShowPhotos = ({ location }) => {
	const [photos, updatePhotos] = useState([]);

	useQuery(LOCATION_TODAY_PHOTOS, {
		variables: { location },
		onCompleted: (data) => updatePhotos(data.locationCurrentDayPhotos),
	});

	return (
		<>
			<h4>Show Photos</h4>
			{photos ? (
				photos.map((photo) => {
					return <img src={photo.url} alt='surf'></img>;
				})
			) : (
				<p>No photos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowPhotos;
