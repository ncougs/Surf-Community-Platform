import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOCATIONS } from '../utils/queries';
import MapMarker from '../components/MapMarker';

const Map = () => {
	const [locations, updateLocations] = useState([]);

	useQuery(LOCATIONS, {
		onCompleted: (data) => updateLocations(data.locations),
	});

	const defaultLocation = {
		center: {
			lat: -37.840935,
			lng: 144.946457,
		},
		zoom: 7,
	};

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_google_maps_apiKey }}
				defaultCenter={defaultLocation.center}
				defaultZoom={defaultLocation.zoom}
			>
				{locations.map((location) => (
					<MapMarker
						lat={location.lat}
						lng={location.lng}
						name={location.name}
					/>
				))}
			</GoogleMapReact>
		</div>
	);
};
export default Map;
