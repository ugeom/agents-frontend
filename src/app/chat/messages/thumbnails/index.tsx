// App imports
import './styles.scss';
import { GLBThumbnail } from './glb';

interface ThumbnailsProps { 
  images: string[] | { url: string, name: string }[];
  onImageSelect?: (imageUrl: string, imageIndex: number) => void;
  isGlb?: boolean;
}

export const Thumbnails = ({ images, onImageSelect, isGlb }: ThumbnailsProps) => {
  if (!images?.length) return null;

  const displayImages = images.slice(0, 6);
  const isSingleImage = images.length === 1;

  const imageClass = `image-thumbnails ${isSingleImage ? 'single-selected' : ''}`;

  const filenames = displayImages
    .map(item => typeof item === 'object' ? item.name : '')
    .filter(Boolean);

  return (
    <div>
      {filenames.length > 0 &&
        <div className="thumbnails-filenames">
          {filenames.join(', ')}
        </div>
      }
      <div className={imageClass}>
        {displayImages.map((item, i) => {
          const url = typeof item === 'string' ? item : item.url;
          const selectable = onImageSelect ? 'selectable' : '';
          const glbThumb = isGlb ? 'glb-thumb' : '';
          const thumbnailClassName = `thumb ${selectable}${glbThumb}`;
          const onClick = onImageSelect ? () => onImageSelect(url, i) : undefined;

          return (
            <div key={i} className={thumbnailClassName}>
              {
                isGlb ? 
                <GLBThumbnail url={url}/> :
                <img 
                  src={url} 
                  alt="" 
                  onClick={onClick}
                />
              }
              {images.length > 6 && i === 5 && (
                <div className="more">
                  +{images.length - 6}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Thumbnails.displayName="Thumbnails";