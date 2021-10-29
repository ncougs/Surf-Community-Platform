/* eslint-disable */
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

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

	const Styles = {
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
		pointer: {
			cursor: 'pointer',
		},
	};

	return (
		<Modal
			size='sm'
			show={openModal}
			onHide={() => {
				closeModal();
			}}
		>
			<Modal.Header
				style={Styles.background}
				className='justify-content-center'
			>
				<Modal.Title style={Styles.mainHeading} className='fs-1 fw-bold'>
					Sign Up
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={Styles.background}>
				<Form onSubmit={handleSignup} style={Styles.background}>
					<Form.Group className='mb-3' controlId='username'>
						<FloatingLabel
							controlId='floatingInput'
							label='Username'
							className='mb-3'
						>
							<Form.Control
								required
								type='text'
								placeholder='Username'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3' controlId='firstName'>
						<FloatingLabel
							controlId='floatingInput'
							label='First Name'
							className='mb-3'
						>
							<Form.Control
								required
								type='text'
								placeholder='First Name'
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3' controlId='lastName'>
						<FloatingLabel
							controlId='floatingInput'
							label='Last Name'
							className='mb-3'
						>
							<Form.Control
								required
								type='text'
								placeholder='Last Name'
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3' controlId='email'>
						<FloatingLabel
							controlId='floatingInput'
							label='Email'
							className='mb-3'
						>
							<Form.Control
								required
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3' controlId='password'>
						<FloatingLabel
							controlId='floatingInput'
							label='Password'
							className='mb-3'
						>
							<Form.Control
								required
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</FloatingLabel>
					</Form.Group>

					<Button
						type='submit'
						style={Styles.mainButton}
						className='p-3 fw-bold'
					>
						Create New Account
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SignupModal;
