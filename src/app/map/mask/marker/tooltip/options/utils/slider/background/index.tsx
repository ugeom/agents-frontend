export const Background = ({ innerHeight, xScale, minBound, maxBound, circleHeight }: any) => {
	const height = circleHeight / 2;

	const rectY = innerHeight / 2 - height / 2;
	const borderRadius = height / 2;
	return (
		<rect
			className="slider-background"
			x={xScale(minBound)}
			y={rectY}
			rx={borderRadius}
			ry={borderRadius}
			width={xScale(maxBound) - xScale(minBound)}
			height={height}
		/>
	)
}

Background.displayName="Background";