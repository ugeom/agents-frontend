// App imports
import { Circle } from './circle';
import { Iso } from './iso';
import { Fill } from './fill';
import { Stroke } from './stroke';
import { Chat } from './chat';
import './styles.scss';

export const Options = ({ marker, activeFeature }: any) => {
	if (activeFeature === "chat") return <Chat/>;

	const Components: any = {
		circle: Circle,
		iso: Iso,
		fill: Fill,
		stroke: Stroke
	}

	const Component = Components[activeFeature];
	
	return (
		<>
			<div className="options-wrapper">
				<Component marker={marker}/>
			</div>
		</>
	)
}

Options.displayName="Options";