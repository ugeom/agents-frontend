// App imports
// import { Location } from './location';
import { Buttons } from './buttons';
import './styles.scss';

export const Header = ({ marker, activeCharts, setActiveCharts }: any) => {
	const { name, image } = marker

	return (
		<div className="card-header">
			<img className="agent-icon" src={image} alt="agent-icon"/>
			<div>
				<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
					<div className="agent-title">{name}</div>
					<Buttons marker={marker} activeCharts={activeCharts} setActiveCharts={setActiveCharts}/>			
				</div>
				{/*<Location marker={marker}/>*/}
			</div>
		</div>
	)
}

Header.displayName="Header";