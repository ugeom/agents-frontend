// React imports
import { useState } from 'react';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Wrapper = ({ markerId, innerWidth, innerHeight, colorScale, markerProperty }: any) => {
    const { updateMarkerProperty } = useMarkers();

    const [selectedIndex, setSelectedIndex] = useState<any>(null);

    const numOptions = 8;

    const cols = 4;
    const rows = 2;

    const rectWidth = innerWidth / cols;
    const rectHeight = innerHeight / rows;

    const onRectangleClick = (index: number) => {
        setSelectedIndex(index);
        const colorValue = index / (numOptions - 1); // Normalize index to [0, 1]
        const fillColor = colorScale(colorValue);
        
        updateMarkerProperty(markerId, markerProperty, fillColor)
    };

    return (
        <>
            {Array.from({ length: numOptions }, (_, index) => {
                const row = Math.floor(index / cols);
                const col = index % cols;
                const x = col * rectWidth + rectWidth / 2;
                const y = row * rectHeight + rectHeight / 2;

                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={rectWidth / 3}
                        fill={selectedIndex === index ? 'black' : colorScale(index / (numOptions - 1))}
                        onClick={() => onRectangleClick(index)}
                        className="color-circle"
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    />
                );
            })}
        </>
    );
};

Wrapper.displayName = 'Wrapper';