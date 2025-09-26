// App imports
import { Section } from './section';
import './styles.scss';

export const Menu = () => {
	return (
		<div className="menu">
            <Section section={"agent"} title={"Add Agent"} />
            <Section section={"features"} title={"Features"} />
            <Section section={"basemaps"} title={"Basemaps"} />
        </div>
	)
}

Menu.displayName="Menu";