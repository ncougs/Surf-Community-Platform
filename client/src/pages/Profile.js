import { useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import { USER_MEDIA } from '../utils/queries';
import PhotoCard from '../components/photoCard';
import VideoCard from '../components/videoCard';
import DisplayFavLocations from '../components/displayFavLocations';

const Profile = () => {
	const currentUser = Auth.getProfile();

	//return all media for the current user
	const { data, loading, error } = useQuery(USER_MEDIA, {
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
				{data ? (
					data?.userMedia.map((media, i) =>
						media.url.includes('video/upload') ? (
							<VideoCard
								key={i}
								location={media.locationID.name}
								url={media.url}
								date={media.date}
							/>
						) : (
							<PhotoCard
								key={i}
								location={media.locationID.name}
								url={media.url}
								date={media.date}
							/>
						)
					)
				) : (
					<p>No media uploaded</p>
				)}
			</Container>
		</>
	);
};

export default Profile;
