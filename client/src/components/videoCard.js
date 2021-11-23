import { Col, Card, Row, Spinner, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ThreeDots } from 'react-bootstrap-icons';
import { DELETE_VIDEO, UPDATE_VIDEO_CAPTION } from '../utils/mutations';
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
	const [updatedCaption, setUpdatedCaption] = useState(caption);
	const [showEditOptions, setShowEditOptions] = useState(false);
	const [editCaptionField, setEditCaptionField] = useState(false);

	const [deleteVideo, { data, loading, error }] = useMutation(DELETE_VIDEO);

	const [
		updateVideoCaption,
		{ data: updateData, loading: updateLoading, error: updateError },
	] = useMutation(UPDATE_VIDEO_CAPTION);

	const isLoggedIn = Auth.loggedIn();

	useEffect(() => {
		if (isLoggedIn) {
			const currentUser = Auth.getProfile();
			currentUser?.data?._id === userID ? setIsUser(true) : setIsUser(false);
		}
	}, [isLoggedIn, userID]);

	const handleUpdateCaption = async (e) => {
		e.preventDefault();

		await updateVideoCaption({
			variables: {
				updateVideoCaptionId: id,
				caption: updatedCaption,
			},
		});

		setShowEditOptions(false);
		setEditCaptionField(false);
	};

	const handleDeletePhoto = async (e) => {
		e.preventDefault();

		await deleteVideo({
			variables: {
				deleteVideoId: id,
				publicId: public_id,
			},
		});

		setShowEditOptions(false);
	};

	const handleShowEdit = async (e) => {
		e.preventDefault();

		setShowEditOptions(!showEditOptions);
		setEditCaptionField(false);
	};

	const handleClickEdit = (e) => {
		e.preventDefault();

		setEditCaptionField(true);
	};

	const Styles = {
		card: {
			maxWidth: '25rem',
			height: 'max-content',
			borderColor: '#FEFFFF',
			borderRadius: '0',
		},
		heading: {
			color: '#042D3C',
			textDecoration: 'none',
		},
		footer: {
			border: 'none',
		},
		video: {
			lineHeight: 'normal',
		},
		cursor: {
			cursor: 'pointer',
		},
	};

	return (
		<>
			<Col lg={isVertical ? '12' : '4'} className='mx-auto my-2'>
				<Card className='mx-auto shadow-lg border-1' style={Styles.card}>
					<Card.Title className='p-2' style={Styles.heading}>
						<Row>
							<Col>
								<Link style={Styles.heading} to={`/location/${location}`}>
									{location}
								</Link>
							</Col>
							<Col className='d-flex justify-content-end'>
								{isUser ? (
									loading || updateLoading ? (
										<Spinner animation='border' style={Styles.heading} />
									) : (
										<>
											<ThreeDots
												style={Styles.cursor}
												onClick={(e) => handleShowEdit(e)}
											/>
											{showEditOptions ? (
												<>
													<span
														style={Styles.cursor}
														onClick={(e) => handleClickEdit(e)}
														className='mx-2'
													>
														Edit
													</span>
													<span
														style={Styles.cursor}
														onClick={(e) => handleDeletePhoto(e)}
														className='mx-2'
													>
														Delete
													</span>
												</>
											) : null}
										</>
									)
								) : null}
							</Col>
						</Row>
					</Card.Title>
					<Link className='text-decoration-none' to={`/location/${location}`}>
						<ReactPlayer
							url={url}
							width='100%'
							height='100%'
							volume={null}
							muted={true}
							controls
							style={Styles.video}
						/>
					</Link>
					<Card.Footer style={Styles.footer}>
						{editCaptionField ? (
							<>
								<Form onSubmit={(e) => handleUpdateCaption(e)} className='mt-3'>
									<Form.Control
										as='textarea'
										rows={3}
										value={updatedCaption}
										onChange={(e) => setUpdatedCaption(e.target.value)}
									/>
									<Button
										onClick={(e) => handleShowEdit(e)}
										className='mt-3 me-3'
										value='cancel'
									>
										Cancel
									</Button>
									<Button type='submit' className='mt-3' value='update'>
										Update Comment
									</Button>
								</Form>
							</>
						) : (
							<>
								<p>
									<small className='text-muted p-2'>{`${user}${
										caption ? `: ${caption}` : ''
									}`}</small>
								</p>

								<small className='text-muted p-2'>{`uploaded at ${moment(
									date,
									'x'
								).format('hh:mm a, DD/MM/YYYY')}`}</small>
							</>
						)}
					</Card.Footer>
				</Card>
			</Col>
		</>
	);
};

export default VideoCard;
