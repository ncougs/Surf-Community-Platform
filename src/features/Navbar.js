import { useState } from 'react';
import { ContainerFluid, NavListItem } from '../components';
import { Modal, Button, Form } from 'react-bootstrap';

const Navbar = () => {
	const [loginModal, LoginModalOpened] = useState(false);

	const closeLoginModal = () => LoginModalOpened(false);
	const OpenLoginModal = () => LoginModalOpened(true);
	return (
		<>
			<nav class='navbar navbar-expand-lg navbar-light bg-light'>
				<ContainerFluid>
					<a class='navbar-brand' href='#top'>
						Community Surf
					</a>
					<form class='d-flex flex-grow-1'>
						<input
							class='form-control me-2'
							type='search'
							placeholder='Search'
							aria-label='Search'
						/>
					</form>
					<button
						class='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span class='navbar-toggler-icon'></span>
					</button>
					<div
						class='collapse navbar-collapse flex-grow-0'
						id='navbarSupportedContent'
					>
						<ul class='navbar-nav me-auto mb-2 mb-lg-0'>
							<NavListItem url={'#top'} title={'Locations'} />
							<NavListItem url={'#top'} title={'About'} />
							<button
								type='button'
								class='btn btn-primary'
								onClick={OpenLoginModal}
							>
								Login
							</button>
						</ul>
					</div>
				</ContainerFluid>
			</nav>
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

export default Navbar;
