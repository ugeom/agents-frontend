// App imports
import { Mic } from './mic';
import './styles.scss';

export const Voice = ({ isListening, isProcessing, startListening, isSupported }: any) => {
	return (
		<button
			className={`mic-button ${isListening ? 'listening' : ''} ${isProcessing ? 'processing' : ''}`}
			onClick={() => startListening()}
			disabled={!isSupported || isProcessing || isListening}
			type="button"
		>
			{
				isProcessing ? '⏳' :
				isListening ? '🔵' :
				<Mic/>
		}
		</button>
	)
}

Voice.displayName="Voice";