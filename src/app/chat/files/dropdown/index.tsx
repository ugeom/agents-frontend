// App imports
import './styles.scss';

export const Dropdown = ({ handleDropdownOption }: any) => {
	return (
		<div className="dropdown-menu">
			<div 
				className="dropdown-item" 
				onClick={() => handleDropdownOption('browse-files')}
			>
				<span className="dropdown-icon">📁</span>
				<span>Browse files</span>
			</div>
			<div 
				className="dropdown-item" 
				onClick={() => handleDropdownOption('camera')}
			>
				<span className="dropdown-icon">📷</span>
				<span>Camera</span>
			</div>
		</div>
	)
}

Dropdown.displayName="Dropdown";