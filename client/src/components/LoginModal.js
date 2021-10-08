import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import LOGIN from '../utils/mutations';

import Auth from '../utils/auth';

const LoginModal = ({ openModal, closeLoginModal }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [login, { data, loading, error }] = useMutation(LOGIN);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await login({
				variables: { username, password },
			});
			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal show={openModal} onHide={closeLoginModal}>
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
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type='submit'>Login</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
