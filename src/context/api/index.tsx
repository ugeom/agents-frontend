import { GoogleApiProvider } from './google';
import { StylesApiProvider } from './styles';
import { RagApiProvider } from './rag';

export const ApiProvider = ({ children }: any) => {
	return (
		<GoogleApiProvider>
		<StylesApiProvider>
		<RagApiProvider>
			{children}
		</RagApiProvider>
		</StylesApiProvider>
		</GoogleApiProvider>
	)
}

ApiProvider.displayName="ApiProvider";