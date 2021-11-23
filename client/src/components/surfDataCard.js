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
	Thermometer,
	Wind,
	Tsunami,
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

	//convert wind speed from mps to km/h
	const convertToKMPH = (speedMPS) => {
		return Math.round(speedMPS * 3.6);
	};

	const Styles = {
		text: {
			color: '#042D3C',
		},
		background: {
			backgroundColor: '#F5F6F9',
		},
	};

	return (
		<Col className='text-center' style={Styles.text}>
			<Card className='shadow-lg m-5 p-3' style={Styles.background}>
				<Card.Title className='fs-4 text-muted'>{time}</Card.Title>
				<Card.Body>
					<Card.Title className='fs-1 fw-bold'>
						<span className='px-2'>
							<Tsunami />
						</span>
						{`${height}ft`}
					</Card.Title>
					<Row>
						<p className='fw-bold fs-5'>
							<Thermometer />
							{`${degrees}°`}
						</p>

						<p className='fw-bold fs-5'>
							<Wind className='m-2' />
							{`${convertToKMPH(windSpeed)}  km/h`}
							<span className='mx-2'>{getDirection(direction)}</span>
						</p>
					</Row>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default SurfDataCard;
