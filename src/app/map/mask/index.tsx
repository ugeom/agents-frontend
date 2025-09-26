// App imports
import { Boundary } from './boundary';
import { Features } from './features';
import { CustomMarker } from './marker';

export const Mask = ({ marker }: any) => {
  return (
    <div key={marker.id}>
      <Boundary marker={marker}/>
      <Features marker={marker}/>
      <CustomMarker marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";