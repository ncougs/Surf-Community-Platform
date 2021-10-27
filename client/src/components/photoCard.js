import { Col, Card } from 'react-bootstrap';
import moment from 'moment';

const PhotoCard = ({ location, date, url }) => {
	const Styles = {
		card: {
			width: '18rem',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		img: {
			borderRadius: '0',
		},
	};
	return (
		<>
			<Col className='my-2'>
				<Card style={Styles.card} className='m-auto shadow-lg border-1'>
					<Card.Title className='p-2'>{location}</Card.Title>
					<Card.Img variant='top' src={url} style={Styles.img} />
					<Card.Footer>
						<small className='text-muted p-2'>{`uploaded at ${moment(
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
