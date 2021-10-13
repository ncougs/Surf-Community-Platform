import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [image, setImage] = useState('');
	const [location, setLocation] = useState('');

	const [postPhoto, { data, loading, error }] = useMutation(POST_PHOTO);

	const clearPostData = () => {
		setImage('');
		setLocation('');
	};

	const uploadImage = async (e) => {
		e.preventDefault();
		clearPostData();
		try {
			const {
				data: { _id },
			} = Auth.getProfile();

			const formData = new FormData();

			formData.append('file', image);
			formData.append('upload_preset', 'devSurfApp');
			formData.append('cloud_name', 'dyhire8bc');

			const upload = await fetch(
				'https://api.cloudinary.com/v1_1/dyhire8bc/image/upload',
				{
					method: 'post',
					body: formData,
				}
			);

			const response = await upload.json();

			const { url } = response;

			const { data } = await postPhoto({
				variables: { url, user_id: _id },
			});

			console.log(data);
			closeModal();
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
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
				<Form onSubmit={uploadImage}>
					<Form.Group className='mb-3' controlId='username'>
						<Form.Label>Location</Form.Label>
						<Form.Control
							required
							type='text'
							placeholder='Anglesea'
							value={location}
							onChange={(e) => {
								setLocation(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group controlId='formFileSm' className='mb-3'>
						<Form.Control
							required
							type='file'
							size='sm'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</Form.Group>
					<Button type='submit'>Upload Photo</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default CreatePostModal;
