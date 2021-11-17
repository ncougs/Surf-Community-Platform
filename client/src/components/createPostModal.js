import { useEffect, useState } from 'react';
import {
	Modal,
	Button,
	Form,
	Spinner,
	FloatingLabel,
	Row,
	Col,
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { POST_PHOTO } from '../utils/mutations';
import { POST_VIDEO } from '../utils/mutations';
import { POST_COMMENT } from '../utils/mutations';
import { LOCATIONS } from '../utils/queries';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [showComments, setShowComments] = useState(false);
	const [showMedia, setShowMedia] = useState(false);
	const [file, setFile] = useState('');
	const [comment, updateComment] = useState('');
	const [caption, updateCaption] = useState('');
	const [locationID, updateSelectedLocationID] = useState('');
	const [locations, updateLocations] = useState([]);
	const [preSelectedLocation, setPreSelectedLocation] = useState('');

	const location = useLocation();

	const [postPhoto, { loading: photoLoading, error: photoError }] =
		useMutation(POST_PHOTO);

	const [postVideo, { loading: videoLoading, error: videoError }] =
		useMutation(POST_VIDEO);

	const [postComment, { loading: commentLoading, error: commentError }] =
		useMutation(POST_COMMENT);

	useQuery(LOCATIONS, {
		onCompleted: (data) => updateLocations(data.locations),
	});

	useEffect(() => {
		const splitLocation = location.pathname.split('/');

		const foundLocation = splitLocation[splitLocation.length - 1];

		const filteredLocations = locations.filter((i) => i.name === foundLocation);

		if (filteredLocations.length) {
			setPreSelectedLocation(foundLocation);
			updateSelectedLocationID(filteredLocations[0]._id);
		} else {
			setPreSelectedLocation('');
		}
	}, [locations, location]);

	const handleSectionRender = (e) => {
		e.preventDefault();

		if (e.target.value == 'comments') {
			setShowComments(true);
			setShowMedia(false);
		} else {
			setShowComments(false);
			setShowMedia(true);
		}
	};

	const clearPostData = () => {
		setFile('');
		updateComment('');
		updateCaption('');
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		comment ? await uploadComment() : await handleUpload();

		clearPostData();
		closeModal();
	};

	const handleUpload = async () => {
		file.name
			.split('.')
			.at(-1)
			.toLowerCase()
			.match(/^(mp4|mov)$/)
			? await uploadVideo()
			: await uploadImage();
	};

	const uploadComment = async () => {
		try {
			const {
				data: { _id },
			} = Auth.getProfile();

			await postComment({
				variables: {
					body: comment,
					user_id: _id,
					locationID,
				},
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	const uploadImage = async () => {
		try {
			const {
				data: { _id },
			} = Auth.getProfile();

			await postPhoto({
				variables: {
					file,
					user_id: _id,
					locationID,
					caption,
				},
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	const uploadVideo = async () => {
		try {
			const {
				data: { _id },
			} = Auth.getProfile();

			await postVideo({
				variables: {
					file,
					user_id: _id,
					locationID,
					caption,
				},
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	const Styles = {
		font: {
			fontFamily: `'Passion One', cursive`,
		},
		mainHeading: {
			color: '#042D3C',
		},
		background: {
			backgroundColor: '#F5F6F9',
		},
		mainButton: {
			backgroundColor: '#0A9D7B',
			borderColor: '#0A9D7B',
			color: '#F5F6F9',
			fontSize: '20px',
			width: '100%',
		},
		secondaryButton: {
			backgroundColor: '#042D3C',
			borderColor: '#042D3C',
			color: '#F5F6F9',
			fontSize: '20px',
		},
		pointer: {
			cursor: 'pointer',
		},
	};

	return (
		<>
			<Modal
				show={openModal}
				onHide={() => {
					closeModal();
				}}
				style={Styles.font}
			>
				<Modal.Header
					className='justify-content-center'
					style={Styles.background}
				>
					<Modal.Title style={Styles.mainHeading} className='fs-1 fw-bold'>
						Create Post
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={Styles.background}>
					<Form onSubmit={handleFormSubmit} style={Styles.background}>
						<Form.Group className='mb-3' controlId='username'>
							<Form.Control
								required
								as='select'
								onChange={(e) => updateSelectedLocationID(e.target.value)}
							>
								{preSelectedLocation ? (
									<option>{preSelectedLocation}</option>
								) : (
									<option>{'--Please Select--'}</option>
								)}

								{locations.map((location, i) => (
									<option key={i} value={location._id}>
										{location.name}
									</option>
								))}
							</Form.Control>
						</Form.Group>

						<Row className='mb-4'>
							<Col className='d-flex'>
								<Button
									onClick={handleSectionRender}
									value='media'
									className='m-auto'
									style={Styles.secondaryButton}
								>
									Upload Media
								</Button>
							</Col>
							<Col className='d-flex'>
								<Button
									onClick={handleSectionRender}
									value='comments'
									className='m-auto'
									style={Styles.secondaryButton}
								>
									Add Comment
								</Button>
							</Col>
						</Row>

						{showMedia && (
							<>
								<Form.Group controlId='uploadFile' className='mb-3'>
									<Form.Control
										required
										type='file'
										onChange={(e) => setFile(e.target.files[0])}
									/>
								</Form.Group>

								<Form.Group controlId='caption' className='mb-3'>
									<FloatingLabel
										controlId='addCaption'
										label='caption'
										className='mb-3'
										value={caption}
										onChange={(e) => updateCaption(e.target.value)}
									>
										<Form.Control required as='textarea' />
									</FloatingLabel>
								</Form.Group>
							</>
						)}

						{showComments && (
							<>
								<Form.Group controlId='comment' className='mb-3'>
									<FloatingLabel
										controlId='addComment'
										label='Comment'
										className='mb-3'
										value={comment}
										onChange={(e) => updateComment(e.target.value)}
									>
										<Form.Control required as='textarea' />
									</FloatingLabel>
								</Form.Group>
							</>
						)}

						{photoLoading || videoLoading || commentLoading ? (
							<Button variant='primary' disabled>
								<Spinner
									as='span'
									animation='border'
									size='sm'
									role='status'
									aria-hidden='true'
									className='mx-1'
								/>
								Loading...
							</Button>
						) : (
							<Button type='submit' style={Styles.mainButton} className='p-3'>
								Create Post
							</Button>
						)}
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default CreatePostModal;
