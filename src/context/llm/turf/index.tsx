// React imports
import { useEffect, useContext, createContext } from 'react';

// Context imports
import { useAgentApi } from 'context/agent';
import { useGeo } from 'context/geo';

// Third-party imports
import * as turf from '@turf/turf';

const TurfContext: React.Context<any> = createContext(null)

export const useTurf = () => useContext(TurfContext);

// Extend window type
declare global {
	interface Window {
		turf: typeof turf;
	}
}

export const TurfProvider = ({children}: any) => {
	const { agentData } = useAgentApi();
	const { mapRef } = useGeo();

	useEffect(() => {
        if (!agentData || !agentData.result || !agentData.tool_name) return;
        if (agentData.tool_name === "get_turf") {
			try {
				// Inject dependencies into global scope
				(window as any).turf = turf;
				(window as any).map = mapRef.current.getMap();

				// Parse the code and join it into one executable string
				const codeArray = JSON.parse(agentData.result)['code'];

				const fullCode = codeArray.join('\n')
					.replaceAll("mapRef", "map")

				// Execute all at once to preserve variable scope
				console.log(fullCode)
				const fn = new Function(fullCode);
				fn();
			} 
			catch (err) {
				console.error('Error executing mesh code:', err);
			}
        }
    }, [ agentData ]);

	return (
		<TurfContext.Provider value={{ }}>
			{children}
		</TurfContext.Provider>
	)
}

TurfContext.displayName = "TurfContext";