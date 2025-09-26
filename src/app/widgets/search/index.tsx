// App imports
import { Suggestions } from './suggestions';
import { Icon } from './icon';
import { Bar } from './bar';
import './styles.scss';

export const Search = () => {
	return (
		<div className="search-wrapper">
			<Bar/>
			<Icon/>
			<Suggestions/>
		</div>
	)
}

Search.displayName="Search";