// React imports
import { useState, useEffect } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGoogleReverseApi } from 'context/api/google/reverse';

export const Location = ({ marker }: any) => {
	const [ addressName, setAddressName ] = useState('')
	const { getCurrentAddress } = useGoogleReverseApi();

	useEffect(() => {
		const loadData = async () => {
			const currentAddress = await getCurrentAddress(marker.longitude, marker.latitude);
			const addressNumber = currentAddress[0].long_name;
			const addressStreet = currentAddress[1].long_name;
			setAddressName(addressStreet + ", " + addressNumber);
		};
		loadData();
	}, [ marker ]);

	const imagePath = process.env.PUBLIC_URL + "/static/icons/pin.svg";

	return (
		<div className="agent-location">
			<img src={imagePath} alt="pin" height="10px"/>
			<div>{addressName}</div>
		</div>
		

	)
}

Location.displayName="Location";