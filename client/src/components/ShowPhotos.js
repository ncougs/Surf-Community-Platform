import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import DisplayDots from './displayDots';
import { LOCATION_TODAY_PHOTOS } from '../utils/queries';
import PhotoCard from './photoCard';

const ShowPhotos = ({ location }) => {
	const [vertical, setVertical] = useState(false);

	const handleClick = (e) => {
		setVertical(!vertical);
	};

	const { data, loading, error, refetch } = useQuery(LOCATION_TODAY_PHOTOS, {
		variables: { location },
	});

	useEffect(() => {
		refetch();
	});

	return (
		<>
			{data?.locationCurrentDayPhotos.length ? (
				<>
					<DisplayDots handleClick={handleClick} />
					{data?.locationCurrentDayPhotos.map((photo, i) => {
						return (
							<PhotoCard
								key={i}
								url={photo.url}
								date={photo.date}
								location={location}
								isVertical={vertical}
							/>
						);
					})}
				</>
			) : (
				<p>No photos uploaded for the day</p>
			)}
		</>
	);
};

export default ShowPhotos;
