export const Properties = ({ onClick, isActiveColor }: any) => {
	return (
		<section className="section-selectors">
			<div 
				className="section-item" 
				onClick={() => onClick("fill")}
				style={{backgroundColor: isActiveColor("fill")}}
			>
				<div className="fill-color-icon"/>
				<div className="header-title">fill</div>
			</div>
			<div 
				className="section-item" 
				onClick={() => onClick("stroke")}
				style={{backgroundColor: isActiveColor("stroke")}}
			>
				<div className="stroke-color-icon"/>
				<div className="header-title">stroke</div>
			</div>
		</section>
	)
}

Properties.displayName="Properties";