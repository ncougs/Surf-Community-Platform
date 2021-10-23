import { Col, Card } from 'react-bootstrap';

const SurfDataCard = ({ time, height, direction, degrees }) => {
	return (
		<Col className='text-start'>
			<Card>
				<Card.Body>
					<Card.Title>{time}</Card.Title>
					<Card.Title>{`${height}ft`}</Card.Title>
					<Card.Title>{direction}</Card.Title>
					<Card.Title>{`${degrees}°`}</Card.Title>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default SurfDataCard;
