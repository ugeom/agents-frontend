import { ThreeProvider } from './three';
import { TurfProvider } from './turf';
import { OvertureProvider } from './overture';

export const LLMProvider = ({ children }: any) => {
	return (
		<OvertureProvider>
		<TurfProvider>
		<ThreeProvider>
			{children}
		</ThreeProvider>
		</TurfProvider>
		</OvertureProvider>
	)
}

LLMProvider.displayName="LLMProvider";