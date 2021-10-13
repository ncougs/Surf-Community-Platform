import { useState, useEffect } from 'react';
import { Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import LoginModal from '../components/LoginModal';
import CreatePostModal from '../components/createPostModal';
import Auth from '../utils/auth';

const NavigationBar = () => {
	const [loginModal, LoginModalOpened] = useState(false);
	const [postModal, postModalOpened] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		Auth.loggedIn() ? setLoggedIn(true) : setLoggedIn(false);
	});

	const closeLoginModal = () => LoginModalOpened(false);
	const OpenLoginModal = () => LoginModalOpened(true);

	const closePostModal = () => postModalOpened(false);
	const openPostModal = () => postModalOpened(true);

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
							{isLoggedIn ? (
								<>
									<Nav.Link onClick={Auth.logout}>Log out</Nav.Link>
									<Button onClick={openPostModal}>Create Post</Button>
								</>
							) : (
								<Button onClick={OpenLoginModal}>Login</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<LoginModal openModal={loginModal} closeLoginModal={closeLoginModal} />
			<CreatePostModal openModal={postModal} closeModal={closePostModal} />
		</>
	);
};

export default NavigationBar;
