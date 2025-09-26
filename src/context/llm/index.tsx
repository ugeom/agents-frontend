import { ThreeProvider } from './three';
import { TurfProvider } from './turf';
import { RoadsProvider } from './roads';
import { MapStyleProvider } from './mapstyle';

export const LLMProvider = ({ children }: any) => {
	return (
		<RoadsProvider>
		<TurfProvider>
		<MapStyleProvider>
		<ThreeProvider>
			{children}
		</ThreeProvider>
		</MapStyleProvider>
		</TurfProvider>
		</RoadsProvider>
	)
}

LLMProvider.displayName="LLMProvider";