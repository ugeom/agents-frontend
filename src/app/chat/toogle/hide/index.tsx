// App imports
import './styles.scss';

export const Hide = ({ chatMode, setChatMode }: any) => {
	const toggleChatMode = () => {
		setChatMode((prev: string) => prev === 'normal' ? 'input-only' : 'normal');
	};
	return (
		<button 
			className="hide-messages-button"
			onClick={toggleChatMode}
			title={
				chatMode === 'normal' ? 
				"Hide conversation" : 
				"Show conversation"
			}
		>
			{chatMode === 'normal' ? '➖' : '💬'}
		</button>
	)
}

Hide.displayName="Hide";