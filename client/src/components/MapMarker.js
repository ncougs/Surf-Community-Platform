import { InfoCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const MapMarker = ({ name }) => {
	const [showDescription, setShowDescription] = useState(false);

	const styles = {
		marker: {
			fontSize: '2rem',
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
					<Popover>
						<Popover.Header as='h3'>{name}</Popover.Header>
						<Popover.Body>
							<strong>Holy guacamole!</strong> Check this info.
						</Popover.Body>
					</Popover>
				}
			>
				<InfoCircleFill style={styles.marker} onClick={handleClick} />
			</OverlayTrigger>
		</>
	);
};

export default MapMarker;
