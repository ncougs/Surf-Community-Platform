/* eslint-disable */
import { useState } from 'react';
import {
	Modal,
	Button,
	Form,
	Alert,
	FloatingLabel,
	Row,
	Col,
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginModal = ({ openModal, closeLoginModal, openSignupModal }) => {
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
			closeLoginModal();
		} catch (e) {
			setError(e.message);
		}
	};

	const Styles = {
		font: {
			fontFamily: `'Passion One', cursive`,
		},
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
		<>
			<Modal
				size='sm'
				show={openModal}
				onHide={() => {
					closeLoginModal();
					removeErrorMessage();
				}}
				style={Styles.font}
			>
				<Modal.Header
					className='justify-content-center'
					style={Styles.background}
				>
					<Modal.Title style={Styles.mainHeading} className='fs-1 fw-bold'>
						Login
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={Styles.background}>
					<Form onSubmit={handleLogin} style={Styles.background}>
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
										removeErrorMessage();
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
										removeErrorMessage();
									}}
								/>
							</FloatingLabel>
						</Form.Group>
						{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
						<Row className='justify-content-space'>
							<Col xs='12' className='mb-4'>
								<Button
									type='submit'
									style={Styles.mainButton}
									className='p-3 fw-bold'
								>
									Login
								</Button>
							</Col>
							<Col
								xs='12'
								onClick={() => {
									closeLoginModal();
									openSignupModal();
								}}
								style={Styles.pointer}
							>
								<p className='text-muted text-center fw-bold'>
									Don't have an account? Create a new account here!
								</p>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default LoginModal;
