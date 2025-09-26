// App imports
import './styles.scss';

export const Send = ({ isProcessing, handleSend }: any) => {
	return (
		<button 
			className="send-button" 
			onClick={() => handleSend()}
			disabled={isProcessing}
			type="button"
		>
			→
		</button>
	)
}

Send.displayName="Send";