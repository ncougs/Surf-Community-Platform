import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';
import { POST_VIDEO } from '../utils/mutations';
import { LOCATIONS } from '../utils/queries';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [file, setFile] = useState('');
	const [locationID, updateSelectedLocationID] = useState('');
	const [locations, updateLocations] = useState([]);

	const [postPhoto, { loading: photoLoading, error: photoError }] =
		useMutation(POST_PHOTO);

	const [postVideo, { loading: videoLoading, error: videoError }] =
		useMutation(POST_VIDEO);

	useQuery(LOCATIONS, {
		onCompleted: (data) => updateLocations(data.locations),
	});

	const clearPostData = () => {
		setFile('');
	};

	const handleUpload = async (e) => {
		e.preventDefault();

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
					<Form onSubmit={handleUpload}>
						<Form.Group className='mb-3' controlId='username'>
							<Form.Control
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

						<Form.Group controlId='formFileSm' className='mb-3'>
							<Form.Control
								required
								type='file'
								size='sm'
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</Form.Group>
						{photoLoading || videoLoading ? (
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
							<Button type='submit'>Upload Photo</Button>
						)}
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default CreatePostModal;
