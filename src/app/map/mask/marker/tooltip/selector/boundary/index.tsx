// App imports
import { SectionItem } from './item';

export const Boundary = ({ onClick, isActiveColor }: any) => {
	return (
		<section className="boundary-selectors">
			<SectionItem 
				name={"circle"} 
				onClick={onClick} 
				isActiveColor={isActiveColor}
			/>
			<SectionItem 
				name={"iso"} 
				onClick={onClick} 
				isActiveColor={isActiveColor}
			/>
		</section>
	)
}

Boundary.displayName="Boundary";