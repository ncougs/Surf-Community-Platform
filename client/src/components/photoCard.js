import { Col, Card } from 'react-bootstrap';
import moment from 'moment';

const PhotoCard = ({ location, date, url }) => {
	const Styles = {
		card: {
			width: '18rem',
		},
	};
	return (
		<>
			<Col className='my-2'>
				<Card style={Styles.card} className='m-auto'>
					<Card.Title className='text-center'>{location}</Card.Title>
					<Card.Img variant='top' src={url} />
					<Card.Footer>
						<small className='text-muted'>{`uploaded at ${moment(
							date,
							'x'
						).format('hh:mm a, DD/MM/YYYY')}`}</small>
					</Card.Footer>
				</Card>
			</Col>
		</>
	);
};

export default PhotoCard;
