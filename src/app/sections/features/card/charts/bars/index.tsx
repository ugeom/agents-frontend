// App imports
import './styles.scss';

export const Bars = ({ distribution, colors, sumOfValues }: any) => {
	return (
		<div className="bars-wrapper">
			{Object.entries(distribution).map(([ key, value]: any) => {
				const currentPercent = value / sumOfValues;
				return (
					<div key={key} className="bars">
						<div>{key.toLowerCase()}</div>
						<div 
							style={{
								width: `${currentPercent * 100}%` , 
								backgroundColor: colors[key]
							}}
						></div>
					</div>
				)
			})}
		</div>
	)
}

Bars.displayName="Bars";