// App imports
import { Fill } from './fill';
import { Lines } from './lines';
import { Eraser } from './eraser';

export const Boundary = ({ marker }: any) => {
  const { id, boundary } = marker;
  
  if (!boundary) return <></>
    
    return (
      <>
        <Eraser id={id} boundary={boundary}/>
        <Lines marker={marker} boundary={boundary}/>
        <Fill marker={marker} boundary={boundary}/>
      </>
    )
}

Boundary.displayName="Boundary";