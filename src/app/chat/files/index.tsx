// React imports
import { useState } from 'react';

// App imports
// import { Dropdown } from './dropdown';
import './styles.scss';

// Utils imports
// import { useFileHandling } from 'utils/file/management';

// Context imports
// import { useRaycaster } from 'context/raycaster';

export const Files = () => {
	const [ showDropdown, setShowDropdown ] = useState(false);
	// const { handleFiles } = useRaycaster();

	// const handleFileProcessed = (message: string) => {
	// 	updateResponse("system", message);
	// };

	// const { fileInputRef, handleFileSelect, triggerFileSelect } = useFileHandling(handleFileProcessed, handleFiles);

	// const handleDropdownOption = (option: string) => {
	// 	// Handle dropdown option selection
	// 	setShowDropdown(false);
		
	// 	if (option === 'browse-files') {
	// 		triggerFileSelect();
	// 	} else if (option === 'camera') {
	// 		// Handle camera functionality
	// 	}
	// };

	// const handleAddAssets = () => {
	// 	setShowDropdown(!showDropdown);
	// };

	return (
		<>
			<input
				type="file"
				// ref={fileInputRef}
				// onChange={handleFileSelect}
				style={{ display: 'none' }}
				accept="*/*"
			/>
			<button
				className="plus-button"
				// onClick={handleAddAssets}
				type="button"
			>
				{showDropdown ? '×' : '+'}
			</button>
			{/*{showDropdown && 
				<Dropdown handleDropdownOption={handleDropdownOption}/>
			}*/}
		</>
	)
}