// React imports
import { useHearts } from 'context/hearts';
import { HeartSvg } from './svg';
import './styles.scss';

export const Hearts = () => {
  const heartsContext = useHearts();
  
  if (!heartsContext) return null;
  
  const { hearts, maxCalls } = heartsContext;

  const renderHeart = (index: number) => {
    const heartState = hearts[index]?.state || 'empty';
    return (
      <div key={index} className="heart-container">
        <HeartSvg state={heartState} size={24} />
      </div>
    );
  };

  return (
    <div className="hearts-container">
      {Array.from({ length: maxCalls }, (_, index) => renderHeart(index))}
    </div>
  );
};

Hearts.displayName = 'Hearts';