import { ContainerFluid, NavListItem } from '../components';

const Navbar = () => {
	return (
		<nav class='navbar navbar-expand-lg navbar-light bg-light'>
			<ContainerFluid>
				<a class='navbar-brand' href='#'>
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
						<button type='button' class='btn btn-primary'>
							Login
						</button>
					</ul>
				</div>
			</ContainerFluid>
		</nav>
	);
};

export default Navbar;
