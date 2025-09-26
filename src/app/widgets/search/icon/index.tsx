// App imports
import './styles.scss';

export const Icon = () => {
	const currentImage = "/static/icons/search.svg";

	return (
		<div className="search-icon-wrapper">
			<img 
		    	src={process.env.PUBLIC_URL + currentImage}
		    	alt="search" 
		    	width="23px"
		    	height="23px"
		    />
	    </div>
	)
}

Icon.displayName="Icon";