// Third-party imports
import * as d3 from 'd3';

export const createSliderScale = (minBound: number, maxBound: number, innerWidth: number, offset: number = 10) => {
    return d3.scaleLinear()
        .domain([minBound, maxBound])
        .range([offset, innerWidth - offset]);
};

export const sliderDefaults = {
    circleHeight: 10,
    offset: 10,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
};