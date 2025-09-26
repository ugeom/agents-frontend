// React imports
import { useEffect, useRef } from 'react';

// App imports
import { Thumbnails } from './thumbnails';
import { RoadsChart } from './roads';
import './styles.scss';

export const Messages = ({ responseData, updateResponse, onImageSelect }: any) => {
	const chatHistoryRef = useRef<HTMLDivElement>(null);

	const handleImageSelect = (imageUrl: string, imageIndex: number) => {
		if (onImageSelect) {
			onImageSelect(imageUrl, imageIndex);
		}
	};

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (chatHistoryRef.current) {
			setTimeout(() => {
				if (chatHistoryRef.current) {
					chatHistoryRef.current.scrollTo({
						top: chatHistoryRef.current.scrollHeight,
						behavior: 'smooth'
					});
				}
			}, 100);
		}
	}, [ responseData ]);

	return (
		<div ref={chatHistoryRef} className="messages">
			{responseData.map((msg: any, index: any) => {
				const isAssistant = msg?.sender === 'assistant';
				const isSystem = msg?.sender === 'system';

				let messageClass = 'user'; // default
				if (isAssistant) messageClass = 'assistant';
				if (isSystem) messageClass = 'system';

				// Handle both string messages and structured message objects
				const currentMessage =
					typeof msg?.message === 'string' ?
					msg.message :
					msg?.message?.text;

				// Check if this is a roads visualization message
				const isRoadsVisualization = msg?.message?.tool_name === "get_roads";

				// Extract GLB URLs from message text
				let glbUrlsInText: string[] = [];
				if (currentMessage) {
					// Find partpacker filenames and convert to full URLs
					const partpackerFiles = currentMessage.match(/partpacker_\d{8}_\d{6}\.glb/g) || [];
					glbUrlsInText = partpackerFiles.map((filename: string) => 
						`https://api.urbangeometry.xyz/api/download-model/${filename}`
					);
				}

				return (
					<div key={index} className={`message ${messageClass}`}>
						{isRoadsVisualization ? <RoadsChart /> : currentMessage}
						{msg?.message?.images && (
							<Thumbnails
								images={msg.message.images}
								onImageSelect={isAssistant && onImageSelect ? handleImageSelect : undefined}
							/>
						)}
						{msg?.message?.glbs && (
							<Thumbnails
								images={msg.message.glbs}
								onImageSelect={isAssistant && onImageSelect ? handleImageSelect : undefined}
								isGlb={true}
							/>
						)}
						{glbUrlsInText.length > 0 && (
							<Thumbnails
								images={glbUrlsInText}
								onImageSelect={isAssistant && onImageSelect ? handleImageSelect : undefined}
								isGlb={true}
							/>
						)}
					</div>

				)
			})}
		</div>
	)
}

Messages.displayName="Messages";