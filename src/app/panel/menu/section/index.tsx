// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Section = ({ section, title }: any) => {
	const { activePage, setActivePage } = useMarkers();
	const isActiveSection = activePage === section ? "active" : "";
	const iconPath = `${process.env.PUBLIC_URL}/static/panel/${section}.svg`;
	
	const onClick = () => 
		activePage !== section ? 
		setActivePage(section) : 
		setActivePage(null);

	const itemClass = `menu-item ${isActiveSection}`;

	return (
		<div className={itemClass} onClick={onClick}>
			<img src={iconPath} alt={title} width="30px"/>
			<span className="section-text">{title}</span>
		</div>
	)
}

Section.displayName="Section";