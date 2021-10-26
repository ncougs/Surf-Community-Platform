import { Form, FloatingLabel, Container } from 'react-bootstrap';
import Map from '../features/GoogleMap';

const Locations = () => {
	return (
		<>
			<h2>Location</h2>
			<p>
				Seach for a location or use the interactive map to select your local
				spot
			</p>
			<Form>
				<FloatingLabel controlId='floatingInput' label='Enter a Location'>
					<Form.Control type='text' />
				</FloatingLabel>
			</Form>
			<Container className='p-0 py-4 flex-grow-1 d-flex'>
				<Map />
			</Container>
		</>
	);
};

export default Locations;
