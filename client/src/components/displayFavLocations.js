import { useQuery } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { USER_FAV_LOCATIONS } from '../utils/queries';

const DisplayFavLocations = ({ id }) => {
	//return users fav locations
	const { data, refetch } = useQuery(USER_FAV_LOCATIONS, {
		variables: { id },
	});

	//refetch on any state change
	useEffect(() => {
		refetch();
	});

	return (
		<>
			<Row>
				<Col lg='5'>
					<h4>Your Favourite Locations</h4>
					<Row>
						{data?.userFavLocations.length ? (
							data.userFavLocations.map((location, i) => (
								<>
									{console.log(location)}
									<Col key={i} lg={3}>
										<Link to={`/location/${location.name}`}>
											{location.name}
										</Link>
									</Col>
								</>
							))
						) : (
							<Col>No favourite Locations</Col>
						)}
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default DisplayFavLocations;
