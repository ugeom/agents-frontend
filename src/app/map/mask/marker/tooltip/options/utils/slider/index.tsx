// React imports
import { useState } from 'react';

// App imports
import { Background } from './background';
import { Foreground } from './foreground';
import { Handler } from './handler';
import { Wrapper } from './wrapper';
import { Markers } from './markers';
import './styles.scss';

// Utils imports
import { SVGWrapper } from 'utils/ui/svg';
import { createSliderScale, sliderDefaults } from 'utils/ui/slider';

export const Slider = ({ markerId, minBound, maxBound, markerProperty, title, initialState }: any) => {
  const [ handlerPosition, setHandlerPosition ] = useState(initialState);
  const [ activeForeground, setActiveForeground ] = useState(false);

  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const { margin, circleHeight, offset } = sliderDefaults;

  const innerWidth: any = (width ?? 0) - margin.left - margin.right;
  const innerHeight: any = (height ?? 0) - margin.top - margin.bottom;

  const xScale: any = createSliderScale(minBound, maxBound, innerWidth, offset);

  return (
    <div className="slider-wrapper">
      <SVGWrapper
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
        margin={margin}
      >
        <Background
          xScale={xScale} 
          minBound={minBound} 
          maxBound={maxBound} 
          circleHeight={circleHeight}
          innerHeight={innerHeight}
        />
        <Foreground
          xScale={xScale} 
          minBound={minBound}
          handlerPosition={handlerPosition} 
          circleHeight={circleHeight}
          innerHeight={innerHeight}
          activeForeground={activeForeground}
        />
        <Markers
          xScale={xScale} 
          cx={xScale(handlerPosition)} 
          cy={innerHeight / 2} 
          r={circleHeight / 2}
          minBound={minBound}
          maxBound={maxBound}
        />
        <Handler
          cx={xScale(handlerPosition)} 
          cy={innerHeight / 2} 
          r={circleHeight}
        />
        <Wrapper
          handlerPosition={handlerPosition}
          xScale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setHandlerPosition={setHandlerPosition}
          minBound={minBound}
          maxBound={maxBound}
          setActiveForeground={setActiveForeground}
          markerId={markerId}
          markerProperty={markerProperty}
        />
      </SVGWrapper>
      <div className="options-title">
        <div>{title}</div>
        <div>{handlerPosition}</div>
      </div>
    </div>
  )
}

Slider.displayName="Slider";