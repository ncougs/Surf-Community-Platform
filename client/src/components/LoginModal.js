import { Modal, Button, Form } from 'react-bootstrap';
const LoginModal = ({ openModal, closeLoginModal }) => {
	return (
		<Modal show={openModal} onHide={closeLoginModal}>
			<Modal.Header className='justify-content-center'>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Username</Form.Label>
						<Form.Control required type='text' placeholder='Username' />
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control required type='password' placeholder='Password' />
					</Form.Group>
					<Button type='submit'>Login</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
