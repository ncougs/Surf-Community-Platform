import { Col, Card, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { X } from 'react-bootstrap-icons';
import { DELETE_VIDEO } from '../utils/mutations';
import Auth from '../utils/auth';

const VideoCard = ({
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

	const [deleteVideo, { data, loading, error }] = useMutation(DELETE_VIDEO, {
		variables: { deleteVideoId: id, publicId: public_id },
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
			await deleteVideo(id, public_id);
		} catch (err) {
			console.error(err);
		}
	};

	const Styles = {
		card: {
			width: '25rem',
			height: 'max-content',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		heading: {
			color: '#042D3C',
		},
		footer: {
			border: 'none',
		},
		video: {
			lineHeight: 'normal',
		},
	};
	return (
		<>
			<Col lg={isVertical ? '12' : '4'} className='mx-auto my-2'>
				<Card className='mx-auto shadow-lg border-1' style={Styles.card}>
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
						<ReactPlayer
							url={url}
							width='100%'
							height='100%'
							volume={null}
							muted={true}
							controls
							style={Styles.video}
						/>
						<Card.Footer style={Styles.footer}>
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
