// App imports
import './styles.scss';

export const History = ({ responseData }: any) => {
	return (
		<div className="chat-history">
			{responseData.map((msg: any, index: any) => {
				const currentTurn = msg?.sender === 'assistant' ? 'assistant' : 'user';
				return (
					<div
						key={index}
						className={`chat-message ${currentTurn}`}
					>
						{msg?.message}
					</div>
				)
			}
			)}
		</div>
	)
}

History.displayName="History";