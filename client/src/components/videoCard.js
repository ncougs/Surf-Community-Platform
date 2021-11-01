import { Col, Card } from 'react-bootstrap';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const VideoCard = ({ location, date, url, isVertical, caption, user }) => {
	const Styles = {
		card: {
			width: '18rem',
			height: 'max-content',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		cardMedidaHeight: {
			height: '20rem',
		},
		heading: {
			color: '#042D3C',
		},
	};
	return (
		<>
			<Col lg={isVertical ? '12' : '4'} className='m-auto my-2'>
				<Card className='m-auto shadow-lg border-1' style={Styles.card}>
					<Link className='text-decoration-none' to={`/location/${location}`}>
						<Card.Title className='p-2' style={Styles.heading}>
							{location}
						</Card.Title>
						<Card.Body style={Styles.cardMedidaHeight} className='p-0'>
							<ReactPlayer url={url} width='100%' height='100%' controls />
						</Card.Body>
						<Card.Footer>
							<p>
								<small className='text-muted p-2'>{`${user}${
									caption ? `: ${caption}` : ''
								}`}</small>
							</p>

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

export default VideoCard;
