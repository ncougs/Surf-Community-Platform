import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';
import { LOCATIONS } from '../utils/queries';

import Auth from '../utils/auth';

const CreatePostModal = ({ openModal, closeModal }) => {
	const [file, setImage] = useState('');
	const [locationID, updateSelectedLocationID] = useState('');
	const [locations, updateLocations] = useState([]);

	const [postPhoto, { loading, error }] = useMutation(POST_PHOTO);

	useQuery(LOCATIONS, {
		onCompleted: (data) => updateLocations(data.locations),
	});

	const clearPostData = () => {
		setImage('');
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
					locationID,
				},
			});

			clearPostData();
			closeModal();
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
					<Form onSubmit={uploadImage}>
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
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</Form.Group>
						{loading ? (
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
