// App imports
import { Agents } from './agents';
import { Features } from './features';
import { Basemaps } from './basemaps';
import './styles.scss';

// Utils imports
import { Cross } from 'utils/ui/cross';

// Context imports
import { useMarkers } from 'context/events/markers';

const sections = [
	{
	  id: 'agent',
	  title: 'Select Your Agent',
	  subtitle: 'Choose an agent from the options to explore the data they represent.',
	  Component: Agents,
	},
	{
	  id: 'basemaps',
	  title: 'Select Your Basemap',
	  subtitle: 'Choose a basemap from the options below.',
	  Component: Basemaps,
	},
	{
	  id: 'features',
	  title: 'Visible Features',
	  subtitle: 'Custom Data Visualizations',
	  Component: Features,
	},
];

export const Sections = () => {
	const { activePage, setActivePage } = useMarkers();

	if (!activePage) return null;

	const section = sections.find((s) => s.id === activePage);
	if (!section) return null;

	const { title, subtitle, Component } = section;

	return (
		<div className="topics">
			<div className="sections">
		      <div className="section-grid">
				<Cross setActivePage={setActivePage}/>
		        <h2>{title}</h2>
		        <p className="section-items">{subtitle}</p>
		        <Component/>
		      </div>
		    </div>
		</div>
	)
}

Sections.displayName="Sections";