// App imports
import { Points } from './points';
import { Polygons } from './polygons';
import { Lines } from './lines';

export const Tiles = () => {
	return (
		<>
			<Points 
				tableSchema={"agents"} 
				tableName={"rotterdam"} 
				styleName={"points-airbnb"}
			/>
			<Points 
				tableSchema={"agents"} 
				tableName={"rotterdam_foursquare"} 
				styleName={"points-foursquare"}
			/>
			<Lines 
				tableSchema={"agents"} 
				tableName={"rotterdam_roads"} 
				styleName={"rotterdam_roads"}
			/>
			<Polygons 
				tableSchema={"agents"} 
				tableName={"rotterdam_buildings"} 
				styleName={"buildings-overture"}
			/>
		</>
	)
}

Tiles.displayName="Tiles"