// App imports
import './styles.scss';

// Context imports
import { useGoogleReverseApi } from 'context/api/google/reverse';

export const Location = () => {
	const { placeInfo } = useGoogleReverseApi();

	return (
		<div className="map-location">
			{placeInfo}
		</div>
	)
}

Location.displayName="Location";