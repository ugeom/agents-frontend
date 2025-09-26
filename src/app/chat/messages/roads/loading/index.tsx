// App imports
import './styles.scss';

export const Loading = () => {
	return (
		<div className="roads-loading">
		  <div className="roads-loading-icon">
		    Loading road data...
		  </div>
		</div>
	)
}

Loading.displayName="Loading";