import { useQuery } from '@apollo/client';
import { LOCATIONS } from '../utils/queries';
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LocationSearchBar = ({ children }) => {
	const history = useHistory();

	const [search, setSearch] = useState('');
	const { data } = useQuery(LOCATIONS);

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/location/${search}`);
	};

	return (
		<>
			<Form onSubmit={handleSubmit} className='flex-grow-1'>
				<Row>
					<Col>
						<FloatingLabel controlId='floatingInput' label='Enter a Location'>
							<input
								class='form-control'
								list='datalistOptions'
								placeholder='Type to search...'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<datalist id='datalistOptions'>
								{data?.locations.length ? (
									data?.locations.map((location) => (
										<option value={location.name} />
									))
								) : (
									<option value='San Francisco' />
								)}
							</datalist>
						</FloatingLabel>
					</Col>
					{children}
				</Row>
			</Form>
		</>
	);
};

export default LocationSearchBar;
