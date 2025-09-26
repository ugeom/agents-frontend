// App imports
import { Card } from './card';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Features = () => {
  const { markers } = useMarkers();

  if (!(Object.keys(markers).length)) return <></>;

  return (
    <div className="features-wrapper">
      {Object.entries(markers).map(([key, value]: any) => (
        <div key={key}>
          <Card marker={value}/>
        </div>
      ))}
    </div>
  );
};

Features.displayName = 'Features';