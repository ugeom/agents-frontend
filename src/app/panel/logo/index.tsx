// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Logo = () => {
	const { setActivePage } = useMarkers();
	const onClick = () => setActivePage(null);
	
	return (
		<div className="logo-wrapper">
			<img 
				className="logo-img"
				src={process.env.PUBLIC_URL + "/static/logos/logo.svg"} 
				alt="logo" 
				onClick={onClick}
			/>
		</div>
	)
}

Logo.displayName="Logo";