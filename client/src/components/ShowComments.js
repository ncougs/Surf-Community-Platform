import { useQuery } from '@apollo/client';
import { Col, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { LOCATION_TODAY_COMMENTS } from '../utils/queries';
import CommentCard from './commentCard';

const ShowComments = ({ location }) => {
	const { data, loading, error } = useQuery(LOCATION_TODAY_COMMENTS, {
		variables: { location },
		pollInterval: 500,
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
						<CommentCard
							key={i}
							body={comment.body}
							username={comment.user_id.username}
							userID={comment.user_id._id}
							id={comment._id}
							date={moment(comment.date, 'x').format('hh:mm a, DD/MM/YYYY')}
						/>
					);
				})
			) : (
				<p>No comments added for the day</p>
			)}
		</>
	);
};

export default ShowComments;
