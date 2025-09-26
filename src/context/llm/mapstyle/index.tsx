// React imports
import { useEffect, useContext, createContext } from 'react';

// Context imports
import { useAgentApi } from 'context/agent';
import { useGeo } from 'context/geo';

const MapStyleContext: React.Context<any> = createContext(null)

export const useMapStyle = () => useContext(MapStyleContext);

export const MapStyleProvider = ({children}: any) => {
	const { agentData } = useAgentApi();
	const { mapRef } = useGeo();

	useEffect(() => {
        if (!agentData || !agentData.result || !agentData.tool_name) return;
        console.log('Agent data received:', agentData.tool_name);
        if (agentData.tool_name === "get_mapstyle") {
			try {
				console.log('Processing map styling data...');
				// Inject map into global scope
				const map = mapRef.current.getMap();
				(window as any).map = map;

				// Parse the code and join it into one executable string
				const parsedResult = JSON.parse(agentData.result);
				const codeData = parsedResult['code'];

				let fullCode;
				if (Array.isArray(codeData)) {
					fullCode = codeData.join('\n')
						.replaceAll("mapRef", "map")
						.replace(/^\s*\n/gm, '');
				} else if (typeof codeData === 'string') {
					fullCode = codeData.replaceAll("mapRef", "map");
				} else {
					console.error('Invalid code format:', codeData);
					return;
				}

				console.log('Map styling code:', fullCode);

				const fn = new Function(fullCode);
				fn();
			}
			catch (err) {
				console.error('Error executing map styling code:', err);
			}
        }
    }, [ agentData ]);

	return (
		<MapStyleContext.Provider value={{ }}>
			{children}
		</MapStyleContext.Provider>
	)
}

MapStyleContext.displayName = "MapStyleContext";