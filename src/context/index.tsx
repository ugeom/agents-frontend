import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { EventsProvider } from './events';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <EventsProvider>
      {children}
    </EventsProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";