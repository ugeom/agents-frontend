// App imports
import { basemaps } from 'utils/data/basemaps';
import { processBasemapItem } from 'utils/data/basemaps/processing';
import './styles.scss'

// Context imports
import { useGeo } from 'context/geo';

export const Basemaps = () => {
	const { setMapStyle } = useGeo();

	return (
		<div className="agent-grid">
			{basemaps.map((basemapId, index) => {
			  	const { name, url, imageUrl, altText } = processBasemapItem(basemapId);

			  	return (
			  		<div key={basemapId}>
				    	<img 
				    		className="thumbnail"
				    		src={imageUrl} 
				    		alt={altText}
				    		onClick={() => setMapStyle(url)}
				    	/>
				    	<span>{name}</span>
				    </div>
				  );
			  })}
		</div>
	)
}

Basemaps.displayName="Basemaps";