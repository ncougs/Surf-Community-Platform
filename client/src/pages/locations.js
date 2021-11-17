import { Container, Button, Col } from 'react-bootstrap';
import LocationSearchBar from '../components/locationSearchBar';

import Map from '../features/GoogleMap';

const Locations = () => {
	const Styles = {
		mainHeading: {
			fontSize: '3rem',
			color: '#F5F6F9',
		},
		text: {
			fontSize: '1rem',
			color: '#F5F6F9',
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
			<Container>
				<h2 style={Styles.mainHeading}>Location</h2>
				<p style={Styles.text}>
					Seach for a location or use the interactive map to select your local
					spot
				</p>
				<LocationSearchBar>
					<Col xs='auto'>
						<Button
							variant='primary'
							type='submit'
							className='h-100'
							style={Styles.mainButton}
						>
							Submit
						</Button>
					</Col>
				</LocationSearchBar>
			</Container>
			<Container className=' py-4 flex-grow-1 d-flex'>
				<Map />
			</Container>
		</>
	);
};

export default Locations;
