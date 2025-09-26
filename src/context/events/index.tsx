import { SearchProvider } from './search';
import { MarkersProvider } from './markers';
import { MaskProvider } from './mask';
import { BoundaryProvider } from './boundary';
import { CursorProvider } from './cursor';

export const EventsProvider = ({children}: any) => {
  return (
    <SearchProvider>
    <MarkersProvider>
    <MaskProvider>
    <BoundaryProvider>
    <CursorProvider>
      {children}
    </CursorProvider>
    </BoundaryProvider>
    </MaskProvider>
    </MarkersProvider>
    </SearchProvider>
  )
}

EventsProvider.displayName="EventsProvider";