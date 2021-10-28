import { Col, Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PhotoCard = ({ location, date, url, isVertical }) => {
	const Styles = {
		card: {
			width: '18rem',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		img: {
			borderRadius: '0',
		},
		heading: {
			color: '#042D3C',
		},
	};
	return (
		<>
			<Col lg={isVertical ? '12' : '4'} className='m-auto my-2'>
				<Card style={Styles.card} className='m-auto shadow-lg border-1'>
					<Link className='text-decoration-none' to={`/location/${location}`}>
						<Card.Title className='p-2' style={Styles.heading}>
							{location}
						</Card.Title>
						<Card.Img variant='top' src={url} style={Styles.img} />
						<Card.Footer>
							<small className='text-muted p-2'>{`uploaded at ${moment(
								date,
								'x'
							).format('hh:mm a, DD/MM/YYYY')}`}</small>
						</Card.Footer>
					</Link>
				</Card>
			</Col>
		</>
	);
};

export default PhotoCard;
