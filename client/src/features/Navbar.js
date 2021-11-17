import { useState, useEffect } from 'react';
import { Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import CreatePostModal from '../components/createPostModal';
import SignupModal from '../components/signupModal';
import Auth from '../utils/auth';
import LocationSearchBar from '../components/locationSearchBar';

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
			minWidth: '300px',
		},
	};

	return (
		<>
			<Navbar expand='sm'>
				<Container fluid>
					<Navbar.Brand>
						<Link className='fs-1' to='/' style={Styles.link}>
							Surf Spot
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<LocationSearchBar />
					<Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
						<Nav>
							{isLoggedIn ? (
								<Link className='m-auto mx-2' to='/profile' style={Styles.link}>
									Profile
								</Link>
							) : null}
							<Link className='m-auto mx-2' to='/locations' style={Styles.link}>
								Locations
							</Link>
							{isLoggedIn ? (
								<>
									<Nav.Link
										className='m-auto mx-2'
										onClick={Auth.logout}
										style={Styles.link}
									>
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
