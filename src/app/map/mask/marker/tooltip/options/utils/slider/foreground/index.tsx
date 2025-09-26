export const Foreground = ({ innerHeight, xScale, minBound, handlerPosition, circleHeight }: any) => {
	const height = circleHeight / 2;

	const rectY = innerHeight / 2 - height / 2;
	const borderRadius = height / 2;

	return (
		<rect
			className="slider-foreground"
			x={xScale(minBound)}
			y={rectY}
			rx={borderRadius}
			ry={borderRadius}
			width={xScale(handlerPosition) - xScale(minBound)}
			height={height}
		/>
	)
}

Foreground.displayName="Foreground";