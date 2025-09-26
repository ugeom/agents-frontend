// React imports
import { useEffect, useCallback, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useThreeLayer } from 'context/three';
import { useAgentApi } from 'context/agent';

// Three.js dependency injection and utilities
import { injectAllThreeDependencies, type DependencyInjectionParams } from 'utils/three/llm';
import { getEcefMatrix } from 'utils/three/matrix/ecef';
import { getMercatorMatrix } from 'utils/three/matrix/mercator';
import { validateCode } from 'utils/validation';
import { transformCode } from 'utils/three/transform';

const ThreeContext: React.Context<any> = createContext(null)

export const useThree = () => useContext(ThreeContext);

export const ThreeProvider = ({children}: any) => {
	const { agentData } = useAgentApi();
	const { mapRef } = useGeo();
	const { rendererRef, cameraRef, sceneRef } = useThreeLayer();

	// Inject Three.js dependencies into global scope using modular structure
	const injectGlobalDependencies = useCallback(() => {
		const dependencyParams: DependencyInjectionParams = {
			scene: sceneRef.current,
			renderer: rendererRef.current,
			camera: cameraRef.current,
			controls: null, // No controls in this context
		};
		
		const dependencies = injectAllThreeDependencies(dependencyParams);
		
		// Add mapRef and utility functions to global scope
		(window as any).mapRef = mapRef;
		(globalThis as any).mapRef = mapRef;
		(window as any).getMercatorMatrix = getMercatorMatrix;
		(globalThis as any).getMercatorMatrix = getMercatorMatrix;
		(window as any).getEcefMatrix = getEcefMatrix;
		(globalThis as any).getEcefMatrix = getEcefMatrix;
		
		return dependencies;
	}, [sceneRef, rendererRef, cameraRef, mapRef, getMercatorMatrix, getEcefMatrix]);

	// Execute LLM-generated Three.js code safely
	const executeThreeCode = useCallback((threeData: string) => {
		try {
			injectGlobalDependencies();
			
			const parsedData = JSON.parse(threeData);
			const codeArray = parsedData.code;
			
			if (!Array.isArray(codeArray)) {
				throw new Error('Invalid code format: expected array');
			}

			const transformedCode = transformCode(codeArray);
			
			// Log the generated code from backend
			const sanitizedTransformedCode = transformedCode.replace(/const complete_data = \[[\s\S]*?\];/g, '');
			console.log('Generated code from backend:', sanitizedTransformedCode);

			// Validate code before execution (defense-in-depth)
			if (!validateCode(transformedCode)) {
				console.error('Code execution blocked by frontend security validation');
				return;
			}

			// Execute the transformed Three.js code
			const executeFunction = new Function(transformedCode);
			executeFunction();
		} 
		catch (err) {
			console.error('Error executing Three.js code:', err);
		}
	}, [injectGlobalDependencies]);

	useEffect(() => {
		if (!agentData || !agentData.result || !(agentData.tool_name === "get_three")) return;
		executeThreeCode(agentData.result);
	}, [agentData, executeThreeCode]);

	return (
		<ThreeContext.Provider value={{ }}>
			{children}
		</ThreeContext.Provider>
	)
}

ThreeContext.displayName = "ThreeContext";