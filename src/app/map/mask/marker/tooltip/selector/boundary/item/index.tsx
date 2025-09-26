export const SectionItem = ({ name, onClick, isActiveColor }: any) => {
	return (
		<div className="section-item" style={{backgroundColor: isActiveColor(name)}}>
			<img 
				className="boundary-icon"
				src={process.env.PUBLIC_URL + `/static/icons/${name}.svg`} 
				alt={name}
				onClick={() => onClick(name)}
			/>
		</div>
	)
}