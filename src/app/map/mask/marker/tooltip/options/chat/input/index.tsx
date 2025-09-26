// React imports
import { useState } from 'react';

// App imports
import { processData } from './data';
import './styles.scss';

// Context imports
import { useGoogleReverseApi } from 'context/api/google/reverse';

export const Input = ({ currentMarker, setRequestData, updateResponse, setRequestText }: any) => {
	const [ searchText, setSearchText ] = useState<any>(null);
	const { currentAddress } = useGoogleReverseApi();

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);
	};

	const cleanSuggestions = () => {
		setSearchText("");
	}

    const sendRequest = (currentText: any) => {
    	setRequestText(currentText);
    	updateResponse("user", currentText)
    	cleanSuggestions();

    	if (currentMarker || currentMarker.length > 0) {
    		const { data, columnName, provider } = currentMarker;

    		if (provider) {
				const processedData = processData(data, columnName);
				
				const geoInfo = {
					geobot_info: currentMarker, 
					data_provider_info: provider, 
					current_layer_data: processedData,
					location_info: currentAddress,
				}
				processedData && setRequestData(geoInfo)
			}
		}
	};

	const onClick = () => sendRequest(searchText);

	const onKeyDown = (e: any) => {
		if (e.keyCode === 13) { // enter
			const currentText: any = e.target.value;
			sendRequest(currentText);
		}
		else if (e.keyCode === 27) { // scape
			setSearchText("");
		}
	};

	return (
		<div className="chat-input-container">
			<textarea
				className="chat-input"
				placeholder="Type your message here..."
				value={searchText || ""}
				spellCheck={false}
				onChange={handleChange}
				onKeyDown={onKeyDown}
			/>
			<button 
				className="chat-send-button" 
				onClick={onClick}
			>
				Send
			</button>
		</div>
	)
}

Input.displayName="Input";