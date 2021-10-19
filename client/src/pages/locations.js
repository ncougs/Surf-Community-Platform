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
				<FloatingLabel
					controlId='floatingInput'
					label='Enter a Location'
					className='mb-3'
				>
					<Form.Control type='text' />
				</FloatingLabel>
			</Form>
			<Container className='p-0'>
				<Map />
			</Container>
		</>
	);
};

export default Locations;
