import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [file, setImage] = useState('');
	const [location, setLocation] = useState('');

	const [postPhoto, { loading, error }] = useMutation(POST_PHOTO);

	const clearPostData = () => {
		setImage('');
		setLocation('');
	};

	const uploadImage = async (e) => {
		e.preventDefault();

		try {
			const {
				data: { _id },
			} = Auth.getProfile();

			await postPhoto({
				variables: {
					file,
					user_id: _id,
					locationID: '6167a859c9ed2c5f1879c226',
				},
			});

			clearPostData();
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
