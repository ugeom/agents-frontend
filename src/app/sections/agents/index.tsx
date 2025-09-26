// App imports
import './styles.scss';

import { providers } from 'utils/data/providers';
import { processProviderItem } from 'utils/data/providers/processing';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Agents = ({ imageUrls }: any) => {
	const { startAddingMarker } = useMarkers();

	return (
		<div className="agent-grid">
		  {providers.map((item: any) => {
		  	const { name, url, processedName } = processProviderItem(item);

		  	return (
			  <div 
			  	key={name}
			  	className="agent-grid-card"
			  	onClick={() => startAddingMarker(url, item)} 
			  >
			    <img src={url} alt={name}/>
			    <span>{processedName}</span>
			  </div>
		  )})}
		</div>
	)
}

Agents.displayName="Agents";