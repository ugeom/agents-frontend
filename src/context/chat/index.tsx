// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useAgentApi } from 'context/agent';

const ChatContext: React.Context<any> = createContext(null)

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: any) => {
	const { fetchAgent } = useAgentApi();
	
	const [ searchText, setSearchText ] = useState<any>("");
	const [ responseData, setResponseData ] = useState<any>([]);

	const updateResponse = (sender: any, message: any) => {
		setResponseData((prev: any) => [...prev, { sender, message }])
	}

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSend();
		}
		else if (e.key === 'Escape') {
			setSearchText("");
		}
	};

	const handleSend = (query?: string) => {
		const queryToSend = query || searchText;
		updateResponse("user", queryToSend);
		fetchAgent(queryToSend);
		setSearchText("");
	}

	return (
		<ChatContext.Provider value={{
			handleChange,
			handleKeyDown,
			responseData,
			setResponseData,
			handleSend,
			searchText
		}}>
			{children}
		</ChatContext.Provider>
	)
}

ChatContext.displayName = "ChatContext";