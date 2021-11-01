import { GeoFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MapMarker = ({ name }) => {
	const [showDescription, setShowDescription] = useState(false);

	const Styles = {
		marker: {
			fontSize: '2rem',
			color: '#042D3C',
		},
		body: {
			backgroundColor: '#F5F6F9',
			fontFamily: `'Passion One', cursive`,
		},
		mainHeading: {
			color: '#042D3C',
		},
		link: {
			color: '#042D3C',
		},
	};

	const handleClick = (e) => {
		e.preventDefault();

		setShowDescription(!showDescription);
	};

	return (
		<>
			<OverlayTrigger
				trigger='click'
				key={name}
				placement={'right'}
				overlay={
					<Popover style={Styles.body}>
						<Popover.Body>
							<h3 style={Styles.mainHeading}>{name}</h3>
							<Link to={`/location/${name}`} style={Styles.link}>
								Head over to the main page to get more info!
							</Link>
						</Popover.Body>
					</Popover>
				}
			>
				<GeoFill style={Styles.marker} onClick={handleClick} />
			</OverlayTrigger>
		</>
	);
};

export default MapMarker;
