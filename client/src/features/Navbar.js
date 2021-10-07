import { useState } from 'react';
import { Modal, Button, Form, Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
	const [loginModal, LoginModalOpened] = useState(false);

	const closeLoginModal = () => LoginModalOpened(false);
	const OpenLoginModal = () => LoginModalOpened(true);
	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container fluid>
					<Navbar.Brand href='#home'>Surf Community Application</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Form className='flex-grow-1'>
						<Form.Group controlId='formBasicEmail'>
							<Form.Control type='text' placeholder='Search' />
						</Form.Group>
					</Form>
					<Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
						<Nav>
							<Nav.Link href='#home'>About</Nav.Link>
							<Nav.Link href='#link'>Locations</Nav.Link>
							<Button onClick={OpenLoginModal}>Login</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Modal show={loginModal} onHide={closeLoginModal}>
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
		</>
	);
};

export default NavigationBar;
