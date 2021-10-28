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

	const Styles = {
		favLocationsContainer: {
			width: 'max-content',
			position: 'relative',
			bottom: '90px',
			backgroundColor: '#F5F6F9',
		},
		favLocationsHeading: {
			fontSize: '3vw',
			color: '#042D3C',
		},
		text: {
			color: '#042D3C',
			fontSize: '1vw',
		},
	};

	return (
		<>
			<Row className='justify-content-center'>
				<Col
					lg='5'
					className='border rounded shadow-lg p-3 d-flex flex-column m-5'
					style={Styles.favLocationsContainer}
				>
					<h4 className='text-center' style={Styles.favLocationsHeading}>
						Your Favourite Locations
					</h4>
					<Row className='text-center'>
						{data?.userFavLocations.length ? (
							data.userFavLocations.map((location, i) => (
								<>
									<Col key={i} className='fs-4'>
										<Link
											className='text-decoration-none'
											to={`/location/${location.name}`}
											style={Styles.text}
										>
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
