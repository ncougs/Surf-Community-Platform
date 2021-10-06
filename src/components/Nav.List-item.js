const NavListItem = ({ url, title }) => {
	return (
		<li class='nav-item m-auto'>
			<a class='nav-link' href={url}>
				{title}
			</a>
		</li>
	);
};

export default NavListItem;
