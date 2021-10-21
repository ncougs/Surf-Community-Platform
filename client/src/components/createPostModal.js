import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, FloatingLabel } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';
import { POST_VIDEO } from '../utils/mutations';
import { POST_COMMENT } from '../utils/mutations';
import { LOCATIONS } from '../utils/queries';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [file, setFile] = useState('');
	const [comment, updateComment] = useState('');
	const [locationID, updateSelectedLocationID] = useState('');
	const [locations, updateLocations] = useState([]);

	const [postPhoto, { loading: photoLoading, error: photoError }] =
		useMutation(POST_PHOTO);

	const [postVideo, { loading: videoLoading, error: videoError }] =
		useMutation(POST_VIDEO);

	const [postComment, { loading: commentLoading, error: commentError }] =
		useMutation(POST_COMMENT);

	useQuery(LOCATIONS, {
		onCompleted: (data) => updateLocations(data.locations),
	});

	const clearPostData = () => {
		setFile('');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		comment ? uploadComment() : handleUpload();
	};

	const handleUpload = async () => {
		file.name
			.split('.')
			.at(-1)
			.toLowerCase()
			.match(/^(mp4|mov)$/)
			? await uploadVideo()
			: await uploadImage();

		clearPostData();
		closeModal();
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
				},
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<>
			<Modal
				show={openModal}
				onHide={() => {
					closeModal();
				}}
			>
				<Modal.Header className='justify-content-center'>
					<Modal.Title>Create Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<Form.Group className='mb-3' controlId='username'>
							<Form.Control
								required
								as='select'
								aria-label='Default select example'
								onChange={(e) => updateSelectedLocationID(e.target.value)}
							>
								<option>{'--Please Select--'}</option>
								{locations.map((location, i) => (
									<option key={i} value={location._id}>
										{location.name}
									</option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group controlId='uploadFile' className='mb-3'>
							<Form.Control
								type='file'
								size='sm'
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</Form.Group>

						<Form.Group controlId='comment' className='mb-3'>
							<FloatingLabel
								controlId='addComment'
								label='Comment'
								className='mb-3'
								value={comment}
								onChange={(e) => updateComment(e.target.value)}
							>
								<Form.Control as='textarea' />
							</FloatingLabel>
						</Form.Group>

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
							<Button type='submit'>Create Post</Button>
						)}
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default CreatePostModal;
