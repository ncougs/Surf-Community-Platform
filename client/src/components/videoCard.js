import { Col, Card } from 'react-bootstrap';
import moment from 'moment';
import ReactPlayer from 'react-player';

const VideoCard = ({ location, date, url }) => {
	const Styles = {
		card: {
			width: '18rem',
			height: '25rem',
		},
		cardMedidaHeight: {
			height: '20rem',
		},
	};
	return (
		<>
			<Col className='my-2'>
				<Card className='m-auto' style={Styles.card}>
					<Card.Title className='text-center'>{location}</Card.Title>
					<Card.Body style={Styles.cardMedidaHeight}>
						<ReactPlayer url={url} width='100%' height='100%' controls />
					</Card.Body>
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

export default VideoCard;
