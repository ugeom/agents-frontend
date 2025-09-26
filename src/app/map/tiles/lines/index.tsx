// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useStylesApi } from 'context/api/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ tableSchema, tableName, styleName }: any) => {
	const { fetchData, getTilesUrl } = useStylesApi();
	const [ styleData, setStyleData ] = useState<any[]>([]);

	useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(tableSchema, tableName);
			setStyleData(data);
		}
		loadData();
	}, []);

	const url = getTilesUrl(tableSchema, tableName);

  	const layers = styleData?.map((style: any, index: number) => {
  		style.paint['line-opacity'] = 0;
		return <Layer key={index} {...style}/>
	});

	return (
		<Source 
			id={styleName}
			type="vector" 
			tiles={[ url ]}
		>
			{layers}
		</Source>
	)
}

Lines.displayName="Lines"