import { useQuery } from '@apollo/client';
import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import Auth from '../utils/auth';
import { USER_MEDIA } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';
import DisplayFavLocations from '../components/displayFavLocations';
import DisplayDots from '../components/displayDots';

const Profile = () => {
	const [vertical, setVertical] = useState(false);

	const handleClick = (e) => {
		setVertical(!vertical);
	};

	const currentUser = Auth.getProfile();

	//return all media for the current user
	const { data, loading, error } = useQuery(USER_MEDIA, {
		variables: { userId: currentUser?.data._id },
		pollInterval: 5000,
	});

	const Styles = {
		mainHeading: {
			fontSize: '5vw',
			color: '#F5F6F9',
		},
		mainHeadingText: {
			fontSize: '2vw',
			color: '#F5F6F9',
		},
		mainSection: {
			minHeight: '30vh',
		},
		secondaryBackground: {
			backgroundColor: '#F5F6F9',
		},
		secondaryHeading: {
			fontSize: '5vw',
			color: '#042D3C',
		},
		secondarySection: {
			position: 'relative',
			bottom: '80px',
		},
	};

	return (
		<>
			<Container className='my-5' style={Styles.mainSection}>
				<h3
					style={Styles.mainHeading}
				>{`Hi ${currentUser?.data?.username},`}</h3>
				<p style={Styles.mainHeadingText}>Welcome to your profile.</p>
			</Container>
			<Container fluid className='p-0 m-0' style={Styles.secondaryBackground}>
				<Container>
					<DisplayFavLocations id={currentUser?.data?._id} />
				</Container>
				<Container>
					<h4 className='text-center mb-5' style={Styles.secondaryHeading}>
						Your Uploaded Media
					</h4>
					<Container>
						<Row>
							{data?.userMedia.length ? (
								<>
									<DisplayDots handleClick={handleClick} />
									{data?.userMedia.map((media, i) =>
										media.url.includes('video/upload') ? (
											<VideoCard
												key={i}
												location={media.locationID.name}
												url={media.url}
												date={media.date}
												isVertical={vertical}
											/>
										) : (
											<PhotoCard
												key={i}
												location={media.locationID.name}
												url={media.url}
												date={media.date}
												isVertical={vertical}
												caption={media.caption}
												user={media.user_id.username}
											/>
										)
									)}
								</>
							) : (
								<p>No media uploaded</p>
							)}
						</Row>
					</Container>
				</Container>
			</Container>
		</>
	);
};

export default Profile;
