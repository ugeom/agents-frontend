// React imports
import { useState } from 'react';

// App imports
import { Selector } from './selector';
import { Options } from './options';
import './styles.scss';

export const Tooltip = ({ marker }: any) => {
  const [ activeFeature, setActiveFeature ] = useState(marker.boundaryType);

  if (!marker) return <></>;

  const onClick = (e: any) => e.stopPropagation();

  return (
    <div className="popup-item" onClick={onClick}>
      <Selector 
        marker={marker} 
        activeFeature={activeFeature} 
        setActiveFeature={setActiveFeature}
      />
      <Options 
        marker={marker} 
        activeFeature={activeFeature}
      />
    </div>
  );
}

Tooltip.diplayName="Tooltip";