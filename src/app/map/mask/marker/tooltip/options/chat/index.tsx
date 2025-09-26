// React imports
import { useState, useEffect } from 'react';

// App imports
import { Response } from './response';
import { Input } from './input';
import './styles.scss';

// Context imports
import { useRagApi } from 'context/api/rag';
import { useMarkers } from 'context/events/markers';

export const Chat = () => {
    const { fetchRag } = useRagApi();
    const { markers, currentMarkerId } = useMarkers();

    const [ requestData, setRequestData ] = useState<any>(null);
    const [ requestText, setRequestText ] = useState('');
    const [ responseData, setResponseData ] = useState<any>({});

    const updateResponse = (sender: any, message: any) => {
    	if (currentMarkerId !== null) {
    		setResponseData((prev: any) => ({
    			...prev,
    			[currentMarkerId]: [
    				...(prev[currentMarkerId] || []),
    				{ sender, message },
    			],
    		}));
    	}
    };

	useEffect(() => {
		const fetchBedrockModel = async () => {
			const modelResponse = await fetchRag(requestText, requestData);
			updateResponse("assistant", modelResponse);
		};
		if (requestData && currentMarkerId) fetchBedrockModel();
	}, [ requestText, requestData ]);

	const currentMarker = currentMarkerId ? markers[currentMarkerId] : null;

	return (
		<div className="chat-interface">
			<div className="chat-header">
				Ask Agent
			</div>
			<Response 
				responseData={responseData} 
				markerId={currentMarkerId || ''}
			/>
			<Input
				currentMarker={currentMarker}
				setRequestData={setRequestData}
				updateResponse={updateResponse}
				setRequestText={setRequestText}
			/>
		</div>
	)
}

