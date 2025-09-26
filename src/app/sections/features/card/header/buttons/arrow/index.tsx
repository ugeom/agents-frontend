// App imports
import './styles.scss';

export const Arrow = ({ activeCharts, setActiveCharts }: any) => {
	return (
		<svg 
			className="dropdown-arrow" 
			height="16" 
			width="14" 
			onClick={() => setActiveCharts((prev: any) => !prev)}
		>
		  {
		  	activeCharts ? 
		  	<polyline points="1,12 7,4 13,12"/> : 
		  	<polyline points="1,4 7,12 13,4"/>
		  }
		</svg>
	)
}

Arrow.displayName="Arrow";