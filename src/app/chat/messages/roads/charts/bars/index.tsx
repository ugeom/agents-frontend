// App imports
import './styles.scss';

export const Bars = ({ distribution, colors, sumOfValues }: any) => {
	return (
		<div className="bars-wrapper">
			{Object.entries(distribution).map(([ key, value]: any) => {
				const currentPercent = value / sumOfValues;
				const width = `${currentPercent * 100}%`;
				const backgroundColor = colors[key];

				return (
					<div key={key} className="bars">
						<div>{key.toLowerCase()}</div>
						<div style={{ width, backgroundColor }}/>
					</div>
				)
			})}
		</div>
	)
}

Bars.displayName="Bars";