// App imports
import './styles.scss';

export const Footer = ({ provider }: any) => {
	return (
		<div className="data-provider">
			<div className="provider-name">data provider</div>
			<img 
				className="provider-image"
				src={process.env.PUBLIC_URL + `/static/providers/${provider}.svg`} 
				alt="provider" 
			/>
		</div>
	)
}

Footer.displayName="Footer";