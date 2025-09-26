// App imports
import { Lines } from './lines';
import { Points } from './points';
import { Polygons } from './polygons';

export const Features = ({ marker }: any) => {
	const { geometryType, id, data } = marker;

	const componentMap: any = {
		Points: Points,
		LineString: Lines,
		Polygon: Polygons
	};

	const Component = componentMap[geometryType];

	return Component ? <Component id={id} data={data} /> : null;
}

Features.displayName='Features';