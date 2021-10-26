import { useState, useEffect } from 'react';
import { Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import CreatePostModal from '../components/createPostModal';
import SignupModal from '../components/signupModal';
import Auth from '../utils/auth';

const NavigationBar = () => {
	const [loginModal, LoginModalOpened] = useState(false);
	const [postModal, postModalOpened] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [signupModal, showSignup] = useState(false);

	useEffect(() => {
		Auth.loggedIn() ? setLoggedIn(true) : setLoggedIn(false);
	});

	const closeLoginModal = () => LoginModalOpened(false);
	const OpenLoginModal = () => LoginModalOpened(true);

	const closePostModal = () => postModalOpened(false);
	const openPostModal = () => postModalOpened(true);

	const closeSignupModal = () => showSignup(false);
	const openSignupModal = () => showSignup(true);

	const Styles = {
		link: {
			color: '#F5F6F9',
			textDecoration: 'none',
			fontSize: '20px',
		},
		mainButton: {
			backgroundColor: '#0A9D7B',
			borderColor: '#0A9D7B',
			color: '#F5F6F9',
			fontSize: '20px',
		},
		searchBar: {
			backgroundColor: '#F5F6F9',
		},
	};

	return (
		<>
			<Navbar expand='lg'>
				<Container fluid>
					<Navbar.Brand>
						<Link to='/' style={Styles.link}>
							Surf Community Application
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Form className='flex-grow-1'>
						<Form.Group controlId='searchBar'>
							<Form.Control
								type='text'
								placeholder='Search'
								style={Styles.searchBar}
							/>
						</Form.Group>
					</Form>
					<Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
						<Nav>
							<Nav.Link href='#home' style={Styles.link}>
								About
							</Nav.Link>
							{isLoggedIn ? (
								<Nav.Link>
									<Link to='/profile' style={Styles.link}>
										Profile
									</Link>
								</Nav.Link>
							) : null}
							<Nav.Link>
								<Link to='/locations' style={Styles.link}>
									Locations
								</Link>
							</Nav.Link>
							{isLoggedIn ? (
								<>
									<Nav.Link onClick={Auth.logout} style={Styles.link}>
										Log out
									</Nav.Link>
									<Button onClick={openPostModal} style={Styles.mainButton}>
										Create Post
									</Button>
								</>
							) : (
								<Button onClick={OpenLoginModal} style={Styles.mainButton}>
									Login
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<LoginModal
				openModal={loginModal}
				closeLoginModal={closeLoginModal}
				openSignupModal={openSignupModal}
			/>
			<CreatePostModal openModal={postModal} closeModal={closePostModal} />
			<SignupModal openModal={signupModal} closeModal={closeSignupModal} />
		</>
	);
};

export default NavigationBar;
