// React imports
import { useState, useEffect } from 'react';

// App imports
import { Send } from './send';
import { Voice } from './voice';
import './styles.scss';

// Context imports
import { useAgentApi } from 'context/agent';
import { useChat } from 'context/chat';

// Utils imports
import { useVoiceRecognition } from 'utils/inputs/voice';

export const Inputs = ({ updateResponse, triggerAgent, setTriggerAgent }: any) => {
	const { fetchAgent, agentData } = useAgentApi();
	const [ currentQuery, setCurrentQuery ] = useState<any>(null);

	const { searchText, handleChange, handleKeyDown, handleSend } = useChat();
	

	const handleVoiceCommand = (command: string) => {
		setCurrentQuery(command);
		updateResponse("user", command);
	};

	const { isListening, isProcessing, isSupported, startListening } = useVoiceRecognition(handleVoiceCommand);

	// Handle triggerAgent from image selection
	useEffect(() => {
		if (triggerAgent) {
			setCurrentQuery(triggerAgent);
			setTriggerAgent(null); // Clear the trigger
		}
	}, [ triggerAgent, setTriggerAgent ]);

	// Execute agent query
	useEffect(() => {
		currentQuery && fetchAgent(currentQuery)
	}, [ currentQuery ]);

	useEffect(() => {
		if (agentData) {
			if (agentData.message && agentData.message.trim()) {
				// Create message object with optional images for assistant
				const messageObj = {
					text: agentData.message,
					...(agentData.images && { images: agentData.images }),
					...(agentData.tool_name && { tool_name: agentData.tool_name })
				};
				updateResponse("assistant", messageObj);
			} else if (agentData.images && agentData.images.length > 0) {
				// If no message but has images, show images with empty text
				const messageObj = {
					text: "",
					images: agentData.images,
					tool_name: agentData.tool_name
				};
				updateResponse("assistant", messageObj);
			}
		}
	}, [ agentData ]);

	return (
		<>
			<textarea
				className="chat-input"
				placeholder={isListening ? "Listening..." : "Ask anything..."}
				spellCheck={false}
				value={searchText}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				disabled={isListening || isProcessing}
				rows={1}
			/>
			{searchText.trim() ? 
				<Send
					isProcessing={isProcessing}
					handleSend={handleSend}
				/>
				: 
				<Voice 
					isListening={isListening} 
					isProcessing={isProcessing} 
					startListening={startListening}
					isSupported={isSupported}
				/>
			}
		</>
	)
}

