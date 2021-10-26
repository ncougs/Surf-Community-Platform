import { Star, StarFill } from 'react-bootstrap-icons';
import Auth from '../utils/auth';
import { useEffect } from 'react';
import { FAVOURITE_LOCATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { USER } from '../utils/queries';

const FavLocation = ({ location }) => {
	//state variables
	const [favLocations, updateFavLocations] = useState([]);
	const [isFavouriteLocation, setFavouriteLocation] = useState(false);

	//get current users _id
	const {
		data: { _id },
	} = Auth.getProfile();

	//return data of current user
	const { data: userData } = useQuery(USER, {
		variables: { userId: _id },
		onCompleted: (data) => {
			updateFavLocations(data.user.favourite_locations);
		},
	});

	//mutation to add a favourite location for the current user
	const [favouriteLocation] = useMutation(FAVOURITE_LOCATION);

	const handleFavouriteLocation = async (e) => {
		e.preventDefault();

		const { data } = await favouriteLocation({
			variables: { user_id: userData.user._id, location },
		});

		//on completion update favLocations state
		updateFavLocations(data.favouriteLocation.favourite_locations);
	};

	//runs whenver favLocation changes
	useEffect(() => {
		//check if current location is a favourite
		const singleLocation = favLocations.filter((i) => i.name === location);

		//set isFavouriteLocation true || false
		singleLocation.length
			? setFavouriteLocation(true)
			: setFavouriteLocation(false);
	}, [favLocations, location]);

	return (
		<>
			{isFavouriteLocation ? (
				<StarFill
					className='mx-3'
					onClick={(e) => handleFavouriteLocation(e)}
				/>
			) : (
				<Star className='mx-3' onClick={(e) => handleFavouriteLocation(e)} />
			)}
		</>
	);
};

export default FavLocation;
