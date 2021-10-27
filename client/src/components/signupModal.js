/* eslint-disable */
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupModal = ({ openModal, closeModal }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const clearSignUpData = () => {
		setUsername('');
		setPassword('');
		setFirstName('');
		setLastName('');
		setEmail('');
	};

	const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			const { data } = await createUser({
				variables: {
					username,
					first_name: firstName,
					last_name: lastName,
					email,
					password,
				},
			});
			Auth.login(data.createUser.token);
			clearSignUpData();
			closeModal();
		} catch (err) {
			console.error(err);
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
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSignup}>
					<Form.Group className='mb-3' controlId='username'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							required
							type='text'
							// placeholder='Username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='firstName'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							required
							type='text'
							// placeholder='First Name'
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='lastName'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							required
							type='text'
							// placeholder='Last Name'
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							required
							type='email'
							// placeholder='Email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type='password'
							// placeholder='Password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</Form.Group>

					<Button type='submit'>Sign Up</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SignupModal;
