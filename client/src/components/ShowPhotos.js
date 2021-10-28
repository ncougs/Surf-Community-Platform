import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { LOCATION_TODAY_PHOTOS } from '../utils/queries';
import PhotoCard from './photoCard';

const ShowPhotos = ({ location }) => {
	const { data, loading, error, refetch } = useQuery(LOCATION_TODAY_PHOTOS, {
		variables: { location },
	});

	useEffect(() => {
		refetch();
	});

	return (
		<>
			{data?.locationCurrentDayPhotos.length ? (
				data.locationCurrentDayPhotos.map((photo) => {
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
