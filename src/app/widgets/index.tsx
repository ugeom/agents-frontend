// App imports
import { Location } from './location';
import { Cursor } from './cursor';
import { Search } from './search';

export const Widgets = () => {
	return (
		<>
			<Location/>
			<Cursor/>
			<Search/>
		</>
	)
}

Widgets.displayName="Widgets";