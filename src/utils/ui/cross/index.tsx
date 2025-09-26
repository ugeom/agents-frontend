// App imports
import './styles.scss';

interface CrossProps {
	setActivePage: (page: string | null) => void;
}

export const Cross = ({ setActivePage }: CrossProps) => {
	return (
		<svg 
			className="sections-cross" 
			onClick={() => setActivePage(null)}
			viewBox="0 0 40 40" 
			width={15}
		>
			<line
				x1={0}	
				x2={40}	
				y1={0}	
				y2={40}	
				stroke="rgba(126, 126, 132, 0.8)"
				strokeWidth={3}
			/>
			<line
				x1={40}	
				x2={0}	
				y1={0}	
				y2={40}	
				stroke="rgba(126, 126, 132, 0.8)"
				strokeWidth={3}
			/>
		</svg>
	)
}

Cross.displayName="Cross";