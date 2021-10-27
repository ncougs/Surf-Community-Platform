import { useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import { USER_PHOTOS, USER_VIDEOS } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';
import DisplayFavLocations from '../components/displayFavLocations';

const Profile = () => {
	const currentUser = Auth.getProfile();

	//return photos of the current user
	const { data: photoData } = useQuery(USER_PHOTOS, {
		variables: { userId: currentUser?.data._id },
	});

	//return videos of the current user
	const { data: videoData } = useQuery(USER_VIDEOS, {
		variables: { userId: currentUser?.data._id },
	});

	return (
		<>
			<h3>{`Hi ${currentUser?.data?.username},`}</h3>
			<p>Welcome to your profile.</p>
			<Container>
				<DisplayFavLocations id={currentUser?.data?._id} />
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
