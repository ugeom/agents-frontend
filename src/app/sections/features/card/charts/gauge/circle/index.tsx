export const Circle = ({ cx, cy, innerRadius, strokeWidth, currentCircumference, circumference,	totalCircumference,	stroke }: any) => {
	const strokeDasharray = `${currentCircumference} ${circumference - currentCircumference}`;
	const strokeDashoffset = -(totalCircumference - currentCircumference);
	
	return (
		<circle
			cx={cx}
			cy={cy}
			fill="none"
			r={innerRadius}
			stroke={stroke}
			strokeWidth= {strokeWidth}
			strokeDasharray={strokeDasharray}
			strokeDashoffset={strokeDashoffset}
		/>
	)
}

Circle.displayName="Circle";