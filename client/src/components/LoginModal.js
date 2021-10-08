/* eslint-disable */
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import LOGIN from '../utils/mutations';

import Auth from '../utils/auth';

const LoginModal = ({ openModal, closeLoginModal }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [errorMessage, setError] = useState('');

	const removeErrorMessage = () => setError('');

	const clearLoginData = () => {
		setUsername('');
		setPassword('');
	};

	const [login, { data, loading, error }] = useMutation(LOGIN);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const { data } = await login({
				variables: { username, password },
			});
			Auth.login(data.login.token);
			clearLoginData();
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<Modal
			show={openModal}
			onHide={() => {
				closeLoginModal();
				removeErrorMessage();
			}}
		>
			<Modal.Header className='justify-content-center'>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleLogin}>
					<Form.Group className='mb-3' controlId='username'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							required
							type='text'
							placeholder='Username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								removeErrorMessage();
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								removeErrorMessage();
							}}
						/>
					</Form.Group>
					{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
					<Button type='submit'>Login</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
