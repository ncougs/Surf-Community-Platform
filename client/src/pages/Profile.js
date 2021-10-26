import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { USER, USER_PHOTOS, USER_VIDEOS } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';

const Profile = () => {
	//state variables
	const [favLocations, updateFavLocations] = useState([]);

	const currentUser = Auth.getProfile();

	//return data of current user
	const { data: userData } = useQuery(USER, {
		variables: { userId: currentUser.data._id },
		onCompleted: (data) => {
			updateFavLocations(data.user.favourite_locations);
		},
	});

	//return photos of the current user
	const { data: photoData } = useQuery(USER_PHOTOS, {
		variables: { userId: currentUser.data._id },
	});

	//return videos of the current user
	const { data: videoData } = useQuery(USER_VIDEOS, {
		variables: { userId: currentUser.data._id },
	});

	return (
		<>
			<h3>{`Hi ${currentUser.data.username},`}</h3>
			<p>Welcome to your profile.</p>
			<Container>
				<Row>
					<Col lg='5'>
						<h4>Your Favourite Locations</h4>
						<Row>
							{favLocations.length
								? favLocations.map((location, i) => (
										<>
											{console.log(location)}
											<Col key={i} lg={3}>
												<p>{location.name}</p>
											</Col>
										</>
								  ))
								: null}
						</Row>
					</Col>
				</Row>
			</Container>
			<Container>
				<h4>Your Uploaded Media</h4>
				{photoData?.userPhotos.length
					? photoData?.userPhotos.map((photo) => {
							return (
								<PhotoCard
									url={photo.url}
									date={photo.date}
									location={photo.locationID.name}
								/>
							);
					  })
					: null}
				{videoData?.userVideos.length
					? videoData?.userVideos.map((video) => {
							return (
								<VideoCard
									url={video.url}
									date={video.date}
									location={video.locationID.name}
								/>
							);
					  })
					: null}
			</Container>
		</>
	);
};

export default Profile;
