import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error = () => {
	const Styles = {
		mainHeading: {
			fontSize: '5vw',
			color: '#F5F6F9',
		},
	};
	return (
		<>
			<Container>
				<h2 className='p-2' style={Styles.mainHeading}>
					404
				</h2>
				<p>
					Page does not exist. Head back over to the
					<Link to='/'> main page </Link> for the latest surf updates.
				</p>
			</Container>
		</>
	);
};

export default Error;
