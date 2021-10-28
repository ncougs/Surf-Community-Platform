import { Heart, HeartFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { FAVOURITE_LOCATION } from '../utils/mutations';
import { USER_FAV_LOCATIONS } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const FavLocation = ({ location, user }) => {
	//state variables
	const [isFavouriteLocation, setFavouriteLocation] = useState(false);

	//return users fav locations
	const { data, loading, error, refetch } = useQuery(USER_FAV_LOCATIONS, {
		variables: { id: user?.data._id },
	});

	//mutation to add a favourite location for the current user
	const [favouriteLocation] = useMutation(FAVOURITE_LOCATION);

	//handle fav location click
	const handleFavouriteLocation = async (e) => {
		e.preventDefault();

		await favouriteLocation({
			variables: { user_id: user.data._id, location },
		});

		refetch();
	};

	//update isFavouriteLocation when data loads
	useEffect(() => {
		if (data) {
			const filteredLocation = data.userFavLocations.filter(
				(i) => i.name === location
			);

			filteredLocation.length
				? setFavouriteLocation(true)
				: setFavouriteLocation(false);
		}
	}, [data]);

	const Styles = {
		fav: {
			color: '#0A9D7B',
			cursor: 'pointer',
		},
	};

	return (
		<>
			{isFavouriteLocation ? (
				<HeartFill
					style={Styles.fav}
					className='mx-3'
					onClick={handleFavouriteLocation}
				/>
			) : (
				<Heart
					style={Styles.fav}
					className='mx-3'
					onClick={handleFavouriteLocation}
				/>
			)}
		</>
	);
};

export default FavLocation;
