import { useState, useEffect } from 'react';
import { Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import LoginModal from '../components/LoginModal';

const NavigationBar = () => {
	const [loginModal, LoginModalOpened] = useState(true);

	const closeLoginModal = () => LoginModalOpened(false);
	const OpenLoginModal = () => LoginModalOpened(true);

	useEffect(() => {
		console.log(loginModal);
	});

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
			<LoginModal openModal={loginModal} closeLoginModal={closeLoginModal} />
		</>
	);
};

export default NavigationBar;
