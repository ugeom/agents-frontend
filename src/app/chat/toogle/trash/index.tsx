// App imports
import './styles.scss';

export const Trash = ({ setResponseData }: any) => {
	return (
		<button 
			className="trash-button"
			onClick={() => setResponseData([])}
			title="Clear conversation"
		>
			🗑️
		</button>
	)
}

Trash.displayName="Trash"