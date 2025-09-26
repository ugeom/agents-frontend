export const Handler = ({ cx, cy, r }: any) => {
    return (
        <circle 
            className="slider-handler" 
            cx={cx} 
            cy={cy} 
            r={r - 1}
        />
    )
}

Handler.displayName="Handler";