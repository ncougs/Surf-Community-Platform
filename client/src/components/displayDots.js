import { ThreeDots, ThreeDotsVertical } from 'react-bootstrap-icons';
import { Row, Button } from 'react-bootstrap';

const DisplayDots = ({ handleClick }) => {
	const Styles = {
		dots: {
			width: 'fit-content',
			fontSize: '2rem',
		},
	};

	return (
		<>
			<Row className='justify-content-center mb-5'>
				<Button
					style={Styles.dots}
					className='mx-3'
					onClick={handleClick}
					value='horizontal'
				>
					<ThreeDots className='m-3' value='horizontal' />
				</Button>
				<Button
					style={Styles.dots}
					className='mx-3'
					onClick={handleClick}
					value='vertical'
				>
					<ThreeDotsVertical className='m-3' value='vertical' />
				</Button>
			</Row>
		</>
	);
};

export default DisplayDots;
