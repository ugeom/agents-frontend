// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers'

const baseUrl = process.env.PUBLIC_URL + "/static/iso/";

const routingProfileValues: any = {
	"walking": baseUrl + "walking.svg",
	"cycling": baseUrl + "cycling.svg",
	"driving": baseUrl + "driving.svg"
}

export const Mobility = ({ markerId }: any) => {
	const { markers, setMarkers } = useMarkers();

	if (!(Object.keys(markers).length)) return <></>

	const currentMarker = markerId && markers[markerId];

	const onClick = (profile: any) => {
		setMarkers((prev: any) => ({
		    ...prev,
		    [markerId]: {
		        ...prev[markerId],
		        routingProfile: profile,
		    },
		}));
	}

	return (
	  	<div>
			<div className="routing-profile">
				{Object.entries(routingProfileValues).map(([key, value]: any) => {
					const isActive = currentMarker && currentMarker.routingProfile === key;
					return (
						<div
							key={key}
							onClick={() => onClick(key)} 
							className={`routing-image-wrapper ${isActive ? "active" : ""}`}
						>
							<img 
								src={isActive ? value.replace(".svg", "-active.svg") : value} 
								alt={key}
							/>
						</div>
					)
				})}
			</div>
			<div className="options-title">Mobility Type</div>
		</div>
	)
}

Mobility.displayName="Mobility";