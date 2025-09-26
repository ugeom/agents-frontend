// App imports
import './styles.scss';

interface HeartSvgProps {
  state: 'full' | 'three-quarter' | 'half' | 'quarter' | 'empty';
  size?: number;
}

export const HeartSvg = ({ state, size = 24 }: HeartSvgProps) => {
  const heartPath = "M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z";
  
  const shouldShowQuarter = (quarter: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft') => {
    switch (state) {
      case 'full': return true;
      case 'three-quarter': return quarter !== 'topRight';
      case 'half': return quarter === 'bottomLeft' || quarter === 'topLeft';
      case 'quarter': return quarter === 'topLeft';
      case 'empty': return false;
      default: return false;
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={`heart-svg ${state}`}
    >
      <defs>
        <clipPath id={`topRight-${size}`}>
          <polygon points="12,0 24,0 24,12 12,12"/>
        </clipPath>
        <clipPath id={`bottomRight-${size}`}>
          <polygon points="12,12 24,12 24,24 12,24"/>
        </clipPath>
        <clipPath id={`bottomLeft-${size}`}>
          <polygon points="0,12 12,12 12,24 0,24"/>
        </clipPath>
        <clipPath id={`topLeft-${size}`}>
          <polygon points="0,0 12,0 12,12 0,12"/>
        </clipPath>
      </defs>
      
      {/* Heart outline */}
      <path
        d={heartPath}
        className="heart-outline"
      />
      {/* Heart quarters */}
      {shouldShowQuarter('topRight') && (
        <path 
          d={heartPath} 
          className="heart-fill"
          clipPath={`url(#topRight-${size})`} 
        />
      )}
      {shouldShowQuarter('bottomRight') && (
        <path 
          d={heartPath} 
          className="heart-fill"
          clipPath={`url(#bottomRight-${size})`} 
        />
      )}
      {shouldShowQuarter('bottomLeft') && (
        <path 
          d={heartPath} 
          className="heart-fill"
          clipPath={`url(#bottomLeft-${size})`} 
        />
      )}
      {shouldShowQuarter('topLeft') && (
        <path 
          d={heartPath} 
          className="heart-fill"
          clipPath={`url(#topLeft-${size})`} 
        />
      )}
    </svg>
  );
};

HeartSvg.displayName = 'HeartSvg';