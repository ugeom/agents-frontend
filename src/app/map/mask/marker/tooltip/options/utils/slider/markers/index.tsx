export const Markers = ({ xScale, cx, cy, r, minBound, maxBound }: any) => {
    const array = Array.from({ length: 11 }, (_, i) => i * (maxBound > 1 ? 1 : 0.1));

    return (
        <>
            {array.map((item: any) => {
                const markerCenter = xScale(minBound + item);
                return (
                    <circle 
                        key={item}
                        className="slider-markers"
                        cx={markerCenter} 
                        cy={cy} 
                        r={r}
                        fill={markerCenter < cx ? "rgba(52, 152, 219, 1)" : "rgba(189, 195, 199, 1)"}
                    />
                )
            })}
        </>
    )
}

Markers.displayName="Markers";