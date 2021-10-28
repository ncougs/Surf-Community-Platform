import { Row, Col, Card } from 'react-bootstrap';
import {
	ArrowUp,
	ArrowDown,
	ArrowRight,
	ArrowLeft,
	ArrowUpLeft,
	ArrowUpRight,
	ArrowDownLeft,
	ArrowDownRight,
} from 'react-bootstrap-icons';

const SurfDataCard = ({ time, height, direction, degrees, windSpeed }) => {
	//return wind direction based off compass direction
	const getDirection = (angle) => {
		const directions = [`N`, `NE`, 'E', 'SE', 'S', 'SW', 'W', 'NW'];
		const component = [
			<ArrowUp />,
			<ArrowUpRight />,
			<ArrowRight />,
			<ArrowDownRight />,
			<ArrowDown />,
			<ArrowDownLeft />,
			<ArrowLeft />,
			<ArrowUpLeft />,
		];
		return (
			<>
				{directions[Math.round(angle / 45) % 8]}
				{component[Math.round(angle / 45) % 8]}
			</>
		);
	};

	const convertToKMPH = (speedMPS) => {
		return `${Math.round(speedMPS * 3.6)} km/h`;
	};

	return (
		<Col className='text-center'>
			<Card className='shadow m-5'>
				<Card.Title className='fs-3'>{time}</Card.Title>
				<Card.Body>
					<Card.Title className='fs-1'>{`${height}ft`}</Card.Title>
					<Row>
						<Col>
							<Card.Title>{`${degrees}°`}</Card.Title>
						</Col>
						<Col>
							<Card.Title>{convertToKMPH(windSpeed)}</Card.Title>
						</Col>
						<Col>
							<Card.Title>{getDirection(direction)}</Card.Title>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default SurfDataCard;
