import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { POST_PHOTO } from '../utils/mutations';

import Auth from '../utils/auth';

const CreatePost = () => {
	const [image, setImage] = useState('');

	const [postPhoto, { data, loading, error }] = useMutation(POST_PHOTO);

	const uploadImage = async () => {
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
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<>
			{Auth.loggedIn() ? (
				<div>
					<div>
						<input
							type='file'
							onChange={(e) => setImage(e.target.files[0])}
						></input>
						<button onClick={uploadImage}>Upload</button>
					</div>
				</div>
			) : (
				<p>You need to be logged in to endorse skills. Please </p>
			)}
		</>
	);
};
export default CreatePost;
