import { Col, Card } from 'react-bootstrap';
import moment from 'moment';
import ReactPlayer from 'react-player';

const VideoCard = ({ location, date, url }) => {
	const Styles = {
		card: {
			width: '18rem',
			height: '25rem',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		cardMedidaHeight: {
			height: '20rem',
		},
	};
	return (
		<>
			<Col className='my-2'>
				<Card className='m-auto shadow-lg border-1' style={Styles.card}>
					<Card.Title className='p-2'>{location}</Card.Title>
					<Card.Body style={Styles.cardMedidaHeight} className='p-0'>
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
