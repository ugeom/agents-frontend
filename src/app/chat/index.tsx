// Context imports
import { useChat } from 'context/chat';

// App imports
import { History } from './history';
import './styles.scss';

export const Chat = () => {
	const { responseData, searchText, handleChange, handleKeyDown, onClick } = useChat();

	return (
		<div className="chat-interface">
			<div className="chat-header">
				Ask Anything
			</div>
			<History responseData={responseData}/>
			<div className="chat-input-container">
				<textarea
					className="chat-input"
					placeholder="Type your message here..."
					spellCheck={false}
					value={searchText}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<button 
					className="chat-send-button" 
					onClick={onClick}
				>
					Send
				</button>
			</div>
		</div>
	)
}

Chat.displayName="Chat";