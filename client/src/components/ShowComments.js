import { useQuery } from '@apollo/client';
import { Col, Spinner } from 'react-bootstrap';
import { LOCATION_TODAY_COMMENTS } from '../utils/queries';

const ShowComments = ({ location }) => {
	const { data, loading, error } = useQuery(LOCATION_TODAY_COMMENTS, {
		variables: { location },
		pollInterval: 5000,
	});

	const Styles = {
		loadingWheel: {
			color: '#0A9D7B',
		},
		fontColour: {
			color: '#042D3C',
		},
	};

	return (
		<>
			{loading ? (
				<>
					<Col>
						<Spinner animation='border' style={Styles.loadingWheel} />
						<span className='mx-2' style={Styles.fontColour}>
							Loading...
						</span>
					</Col>
				</>
			) : data?.locationCurrentDayComments.length ? (
				data.locationCurrentDayComments.map((comment, i) => {
					return (
						<div key={i}>
							<h5>{comment.user_id.username}</h5>
							<p>{comment.body}</p>
						</div>
					);
				})
			) : (
				<p>No comments added for the day</p>
			)}
		</>
	);
};

export default ShowComments;
