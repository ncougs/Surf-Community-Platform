import { Col, Card, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { X } from 'react-bootstrap-icons';
import { DELETE_PHOTO } from '../utils/mutations';

const PhotoCard = ({ location, date, url, isVertical, caption, user, id }) => {
	const [deletePhoto, { data, loading, error }] = useMutation(DELETE_PHOTO, {
		variables: { deletePhotoId: id },
	});

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			await deletePhoto(id);
		} catch (err) {
			console.error(err);
		}
	};

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
							<Row>
								<Col>{location}</Col>
								<Col className='d-flex justify-content-end'>
									<X onClick={(e) => handleClick(e)} />
								</Col>
							</Row>
						</Card.Title>
						<Card.Img variant='top' src={url} style={Styles.img} />
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

export default PhotoCard;
