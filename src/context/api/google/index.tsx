// App imports
import { GoogleSearchApiProvider } from './search';
import { GoogleDetailsApiProvider } from './details';
import { GoogleReverseApiProvider } from './reverse';

export const GoogleApiProvider = ({children}: any) => {
  return (
    <GoogleSearchApiProvider>
    <GoogleDetailsApiProvider>
    <GoogleReverseApiProvider>
      {children}
    </GoogleReverseApiProvider>
    </GoogleDetailsApiProvider>
    </GoogleSearchApiProvider>
  )
}

GoogleApiProvider.displayName="GoogleApiProvider";