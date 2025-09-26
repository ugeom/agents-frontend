// App imports
import './styles.scss';

// Context imports
import { useSearch } from 'context/events/search';

export const Bar = () => {
	const { inputRef, searchText, handleChange, handleKeyDown } = useSearch();

	return (
		<input 
			type="text"
			ref={inputRef}
			className="search-input"
			value={searchText}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			placeholder="Find a place"
			spellCheck={false}
		/>
	)
}

Bar.displayName="Bar";