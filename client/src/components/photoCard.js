import { Col, Card, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { X } from 'react-bootstrap-icons';
import { DELETE_PHOTO } from '../utils/mutations';
import Auth from '../utils/auth';

const PhotoCard = ({
	location,
	date,
	url,
	isVertical,
	caption,
	user,
	userID,
	id,
	public_id,
}) => {
	const [isUser, setIsUser] = useState(false);

	const [deletePhoto, { data, loading, error }] = useMutation(DELETE_PHOTO, {
		variables: { deletePhotoId: id, publicId: public_id },
	});

	const isLoggedIn = Auth.loggedIn();

	useEffect(() => {
		if (isLoggedIn) {
			const currentUser = Auth.getProfile();
			currentUser?.data?._id === userID ? setIsUser(true) : setIsUser(false);
		}
	}, [isLoggedIn, userID]);

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			await deletePhoto(id, public_id);
		} catch (err) {
			console.error(err);
		}
	};

	const Styles = {
		card: {
			maxWidth: '25rem',
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
			<Col lg={isVertical ? '12' : '4'} className='mx-auto my-2'>
				<Card style={Styles.card} className='mx-auto shadow-lg border-1'>
					<Link className='text-decoration-none' to={`/location/${location}`}>
						<Card.Title className='p-2' style={Styles.heading}>
							<Row>
								<Col>{location}</Col>
								<Col className='d-flex justify-content-end'>
									{isUser ? (
										loading ? (
											<Spinner animation='border' style={Styles.heading} />
										) : (
											<X onClick={(e) => handleClick(e)} />
										)
									) : (
										''
									)}
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
