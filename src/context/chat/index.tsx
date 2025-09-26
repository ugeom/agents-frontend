// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useAgentApi } from 'context/agent';

const ChatContext: React.Context<any> = createContext(null)

export const useChat = () => {
	return (
		useContext(ChatContext)
	)
}

export const ChatProvider = ({ children }: any) => {
	const { metaData } = useGeo();
	const { fetchAgent, agentData } = useAgentApi();
	
	const [ currentQuery, setCurrentQuery ] = useState<any>(null);
	
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
		if (e.keyCode === 13) { // enter
			const currentText: any = e.target.value;
			setCurrentQuery(currentText)
			updateResponse("user", currentText);
			setSearchText("");
		}
		else if (e.keyCode === 27) { // scape
			setSearchText("");
		}
	};

	const onClick = () => {
		setCurrentQuery(searchText)
		updateResponse("user", searchText);
		setSearchText("");
	}

	useEffect(() => {
		currentQuery && fetchAgent(currentQuery, metaData);
	}, [ currentQuery ]);

	useEffect(() => {
		if (agentData) {
			const message = JSON.stringify(agentData.message);
			updateResponse("assistant", message);
		}
	}, [ agentData ]);

	return (
		<ChatContext.Provider value={{
			handleChange,
			handleKeyDown,
			responseData,
			onClick,
			searchText
		}}>
			{children}
		</ChatContext.Provider>
	)
}

ChatContext.displayName = "ChatContext";