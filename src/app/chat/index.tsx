// React imports
import { useState } from 'react';

// App imports
import { Toogle } from './toogle';
import { Messages } from './messages';
import { Inputs } from './inputs';
import { Files } from './files';
import './styles.scss';

// Context imports
import { useChat } from 'context/chat';

export const Chat = () => {
	const { responseData, setResponseData } = useChat();

	const [ chatMode, setChatMode ] = useState<'normal' | 'input-only'>('normal');
	const [ triggerAgent, setTriggerAgent ] = useState<string | null>(null);

	const updateResponse = (sender: any, message: any) => {
		setResponseData((prev: any) => [...prev, { sender, message }])
	}

	const handleImageSelect = (imageUrl: string, imageIndex: number) => {
		const images = [ imageUrl ];
		const text = `Selected Image`;
		updateResponse("user", { text , images });

		const selectionMessage = `I select image ${imageIndex + 1}: ${imageUrl}`;
		setTriggerAgent(selectionMessage); // This will be passed to Inputs
	}

	return (
		<div className={`chat-wrapper ${chatMode}`}>
			<Toogle 
				responseData={responseData} 
				setResponseData={setResponseData} 
				chatMode={chatMode} 
				setChatMode={setChatMode}
			/>
			<div className="chat-header">
			</div>
			{chatMode !== 'input-only' && 
				<Messages 
					responseData={responseData}
					updateResponse={updateResponse}
					onImageSelect={handleImageSelect}
				/>
			}
			<div className="input-container">
				<Files/>
				<Inputs 
					updateResponse={updateResponse}
					triggerAgent={triggerAgent}
					setTriggerAgent={setTriggerAgent}
				/>
			</div>
		</div>
	)
}

Chat.displayName="Chat";