// App imports
import './styles.scss';

export const Logo = () => {
	return (
		<header className="app-header">
			<img 
				src="/static/logos/logo.svg" 
				alt="Urban Geometry Logo" 
				className="app-logo" 
			/>
		</header>
	)
}