import { useQuery } from '@apollo/client';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { USER_FAV_LOCATIONS } from '../utils/queries';

const DisplayFavLocations = ({ id }) => {
	//return users fav locations
	const { data } = useQuery(USER_FAV_LOCATIONS, {
		variables: { id },
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
		mainButton: {
			backgroundColor: '#0A9D7B',
			borderColor: '#0A9D7B',
			color: '#F5F6F9',
			fontSize: '20px',
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
											<Button style={Styles.mainButton}>{location.name}</Button>
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
